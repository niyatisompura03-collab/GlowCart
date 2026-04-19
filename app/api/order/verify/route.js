import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { inngest } from "@/config/inngest";
import User from "@/models/user";
import connectDB from "@/config/db";
import crypto from "crypto";

export async function POST(request) {

    try {

        const { userId } = getAuth(request)
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, address, items, amount } = await request.json();

        // Verify signature
        const key_secret = process.env.RAZORPAY_KEY_SECRET;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        
        const expectedSignature = crypto
            .createHmac("sha256", key_secret)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {

            await connectDB()

            // Payment verified, trigger order creation via inngest
            await inngest.send({
                name: 'order/created',
                data: { userId, items, amount, address, date: Date.now(), paymentMethod: 'Razorpay', paymentStatus: 'Paid' }
            })

            // clear user cart
            const user = await User.findById(userId)
            user.cartItems = {}
            await user.save()

            return NextResponse.json({ success: true, message: "Payment Verified & Order Placed" }, { status: 200 })

        } else {
            return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message }, { status: 400 })
    }

}
