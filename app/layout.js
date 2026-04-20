import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import ChatBot from "@/components/ChatBot";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "GlowCart",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.className} antialiased`} >
        <Toaster />
        <AppContextProvider>
          {children}
        </AppContextProvider>
        <ChatBot />
      </body>
    </html>
    </ClerkProvider>
  );
}
