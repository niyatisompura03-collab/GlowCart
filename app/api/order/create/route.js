import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/user";
import connectDB from "@/config/db";

export async function POST(request){

    try {
        
        const {userId} = getAuth(request)
        const {address, items } = await request.json();

        if(!address || items.length === 0){
            return NextResponse.json({success: false, message: "All fields are required"}, {status: 400})
        }

        await connectDB()

        // calculate amount using items
        let amount = 0;
        for (const item of items) {
           const product = await Product.findById(item.product)
           amount += product.offerPrice * item.quantity
        }

        await inngest.send({
            name: 'order/created',
            data: {userId, items, amount: amount + Math.floor(amount * 0.02), address, date: Date.now()}
        })

        // clear user cart
        const user = await User.findById(userId)
        user.cartItems = {}
        await user.save()

        return NextResponse.json({success: true, message: "Order Placed successfully"}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: error.message}, {status: 400})
    }

}