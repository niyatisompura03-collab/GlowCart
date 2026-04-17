import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/user"; // ✅ your mongoose model
import Order from "@/models/order";


export const inngest = new Inngest({ id: "glowcart-next" });

/* ================= CREATE USER ================= */
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: { event: "clerk/user.created" }, // ✅ correct
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };

    await connectDB();
    await User.create(userData); // ✅ correct
  }
);

/* ================= UPDATE USER ================= */
export const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: { event: "clerk/user.updated" }, // ✅ correct
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };

    await connectDB();
    await User.findByIdAndUpdate(id, userData); // ✅ correct
  }
);

/* ================= DELETE USER ================= */
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
    triggers: { event: "clerk/user.deleted" }, // ✅ correct
  },
  async ({ event }) => {
    const { id } = event.data;

    await connectDB();
    await User.findByIdAndDelete(id); // ✅ correct
  }
);

// Inngest Function to create user's order in database
export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 5,
      maxWait: "5s",
    },
    triggers: [
      { event: 'order/created' }
    ]
  },
  async ({ events }) => {
    const orders = events.map((event) => {
      
      return {userId: event.data.userId,
              items: event.data.items, 
              amount: event.data.amount, 
              address: event.data.address, 
              date: event.data.date
            }
    })

    await connectDB()
    await Order.insertMany(orders) // ✅ correct

    return {success: true, processed: orders.length};
  }
);