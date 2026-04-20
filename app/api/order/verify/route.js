import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { inngest } from "@/config/inngest";
import User from "@/models/user";
import connectDB from "@/config/db";
import crypto from "crypto";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

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

            // Fetch payment details to get the actual method (card, netbanking, etc.)
            const payment = await razorpay.payments.fetch(razorpay_payment_id);
            const method = payment.method; // 'card', 'netbanking', 'wallet', 'upi', etc.

            console.log("Triggering inngest with data:", { userId, items, amount, address, method });

            // Payment verified, trigger order creation via inngest
            try {
                await inngest.send({
                    name: 'order/created',
                    data: { 
                        userId, 
                        items, 
                        amount, 
                        address, 
                        date: Date.now(), 
                        paymentMethod: method.charAt(0).toUpperCase() + method.slice(1), 
                        paymentStatus: 'Paid' 
                    }
                })
            } catch (inngestError) {
                console.error("Inngest Event Error:", inngestError);
                // We still want to clear the cart if payment was successful, 
                // but we should probably inform that background processing started or failed.
            }

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
