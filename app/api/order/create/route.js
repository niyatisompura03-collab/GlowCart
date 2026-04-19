import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/config/db";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function POST(request) {

    try {

        const { userId } = getAuth(request)
        const { address, items } = await request.json();

        if (!address || items.length === 0) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
        }

        await connectDB()

        // calculate amount using items
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product)
            amount += product.offerPrice * item.quantity
        }

        const totalAmount = amount + Math.floor(amount * 0.02)

        const options = {
            amount: totalAmount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options)

        return NextResponse.json({ success: true, order }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message }, { status: 400 })
    }

}