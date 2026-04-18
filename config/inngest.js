import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/user";
import Order from "@/models/order";

export const inngest = new Inngest({
  id: "glowcart-next-v2",
  name: "GlowCart",
});

/* ================= CREATE USER ================= */
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk-final",
    triggers: { event: "clerk/user.created" }, // ✅ FIXED
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
    await User.create(userData);
  }
);

/* ================= UPDATE USER ================= */
export const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk-final",
    triggers: { event: "clerk/user.updated" }, // ✅ FIXED
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };

    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

/* ================= DELETE USER ================= */
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk-final",
    triggers: { event: "clerk/user.deleted" }, // ✅ FIXED
  },
  async ({ event }) => {
    const { id } = event.data;

    await connectDB();
    await User.findByIdAndDelete(id);
  }
);

/* ================= CREATE ORDER ================= */
export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order-clean",
    triggers: [{ event: "order/created" }], // Changed to array for better compatibility
  },
  async ({ event }) => {
    const { userId, items, amount, address, date } = event.data;

    await connectDB();
    await Order.create({
      userId,
      items,
      amount,
      address,
      date,
    });

    return { success: true };
  }
);