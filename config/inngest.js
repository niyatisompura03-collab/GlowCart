// src/inngest/client.ts
import { Inngest } from "inngest";
import connectDB from "./db";
import { currentUser } from "@clerk/nextjs/server";

export const inngest = new Inngest({ id: "glowcart-next" });

// Inngest function to save user data to database
export const syncUserCreation = inngest.createFunction(
    {
        id : 'sync-user-from-clerk'
    },
    { event : 'clerk/user.created'},
    async ({event}) => {
        const  { id, first_name, last_name, email_addresses, image_url} = event.data

        const userData = {
            _id : id,
            email : email_addresses[0].email_address,
            name : `${first_name} ${last_name}`,
            imageUrl : image_url
        }
        await connectDB()
        await currentUser.create(userData)
    }
)

// Inngest Function to update user data in database
export const syncUserUpdation = inngest.createFunction(
    {
        id : 'update-user-from-clerk'
    },
    { event : 'clerk/user.updated'},
    async ({event}) => {
        const  { id, first_name, last_name, email_addresses, image_url} = event.data

        const userData = {
            _id : id,
            email : email_addresses[0].email_address,
            name : `${first_name} ${last_name}`,
            imageUrl : image_url
        }
        await connectDB()
        await currentUser.findByIdAndUpdate(id, userData)
    }
)

// Inngest function to delete user from database
export const syncUserDeletion = inngest.createFunction(
    {
        id : 'delete-user-with-clerk'
    },
    { event: 'clerk/user.deleted'},
    async ({event}) =>{
        const { id } = event.data
        await connectDB()
        await currentUser.findByIdAndDelete(id)
    }
)