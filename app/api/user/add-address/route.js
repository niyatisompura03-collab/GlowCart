import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/user";
import Address from "@/models/address";


export async function POST(request){
    try {
        const {userId} = getAuth(request)
        const {addressData} = await request.json()

        console.log("Received addressData:", addressData);

        await connectDB()

        const newAddress = await Address.create({userId, ...addressData})

        return NextResponse.json({success: true, message: 'Address added successfully'})
    } catch (error) {
        return NextResponse.json({success: false, message: error.message})
    }
}