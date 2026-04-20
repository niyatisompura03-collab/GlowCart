import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import connectDB from "@/config/db";
import Product from "@/models/Product";

export const maxDuration = 30; // Extend duration for DB/API sync

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), { status: 400 });
    }

    // Attempt to get product context BUT don't crash if it fails
    let productContext = "Catalog currently unavailable.";
    try {
      await connectDB();
      // Only wait 3 seconds for DB, otherwise skip
      const products = await Promise.race([
        Product.find({}).limit(15),
        new Promise((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), 3000))
      ]);
      
      if (products && products.length > 0) {
        productContext = products.map(p => `- ${p.name}: ${p.description} ($${p.offerPrice || p.price})`).join('\n');
      }
    } catch (dbError) {
      console.warn("Continuing without DB context:", dbError.message);
    }

    const systemPrompt = `
      You are "GlowBot", the elite beauty AI for GlowCart.
      Personality: Sophisticated, helpful, and concise.
      
      Store Catalog:
      ${productContext}
      
      Instructions:
      - Use the catalog for recommendations. 
      - If empty, give general beauty advice and mention we're updating stock.
      - Never hallucinate products not in the list.
    `;

    // Ensure the API key is present
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is missing in environment variables.");
    }

    const result = await streamText({
      model: google('gemini-2.5-flash'),
      messages,
      system: systemPrompt,
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.error("DEBUGGER - Chat API Error:", error);
    
    // Return a JSON error that our frontend can actually read
    return new Response(JSON.stringify({ 
      error: "AI_ROUTE_FAILURE", 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
