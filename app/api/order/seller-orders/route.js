import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Order from "@/models/order";
import Address from "@/models/address";
import Product from "@/models/Product";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Seller orders retrieval API
export async function GET(request) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401})
        }

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401})
        }

        await connectDB()

        const orders = await Order.find({}).populate('address items.product')

        return NextResponse.json({success: true, orders})

    } catch (error) {
        console.error("Seller Orders Error:", error);
        return NextResponse.json({success: false, message: error.message}, {status: 500})        
    }
}