import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/user";
import Cart from "@/models/Cart";


export async function POST(request){
    try {
        
        const {userId} = getAuth(request)
        const {cartData} = await request.json()

        await connectDB()

        const existingCart = await Cart.findOne({userId})

        if(existingCart){
            existingCart.items = cartData
            await existingCart.save()
        }else{
            const newCart = new Cart({userId, items: cartData})
            await newCart.save()
        }

        const user = await User.findById(userId)

        user.cartItems = cartData
        await user.save()

        return NextResponse.json({success: true, message: 'Cart updated successfully'})


    } catch (error) {
        return NextResponse.json({success: false, message: error.message})
    }
}