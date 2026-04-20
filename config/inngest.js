import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/user";
import Order from "@/models/order";
import Address from "@/models/address";
import Product from "@/models/Product";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

console.log("Inngest Config Initialized - Functions Loaded");

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
    const { userId, items, amount, address, date, paymentMethod, paymentStatus } = event.data;

    await connectDB();
    await Order.create({
      userId,
      items,
      amount,
      address,
      date,
      paymentMethod,
      paymentStatus,
    });

    return { success: true };
  }
);

/* ================= SEND ORDER NOTIFICATION ================= */
export const sendOrderNotification = inngest.createFunction(
  {
    id: "send-order-notification",
    triggers: [{ event: "order/created" }],
  },
  async ({ event }) => {
    console.log("EVENT RECEIVED: order/created (Email Function)");
    const { userId, items, amount, address, paymentMethod } = event.data;

    try {
      await connectDB();
      const user = await User.findById(userId);

      if (user && user.email) {
        console.log(`Attempting to send email to: ${user.email}`);

        // Fetch the full address details if it's an ID
        let fullAddress = address;
        if (typeof address === 'string') {
          fullAddress = await Address.findById(address);
        }

        // Fetch product details for each item if they are just IDs
        const itemsWithDetails = await Promise.all(items.map(async (item) => {
          let productDetails = item.product;
          if (typeof item.product === 'string') {
            productDetails = await Product.findById(item.product);
          } else if (item._id && !item.product) {
            productDetails = await Product.findById(item._id);
          }
          
          return {
            ...item,
            product: productDetails || { name: 'Unknown Product' } 
          };
        }));
        
        // Ensure we have a valid address object for the template
        const safeAddress = fullAddress || { fullName: 'Customer', area: '', city: '' };

        const { data, error } = await resend.emails.send({
          from: 'GlowCart <onboarding@resend.dev>',
          to: [user.email],
          subject: 'Order Confirmation - GlowCart',
          react: EmailTemplate({ 
            order: { 
              address: safeAddress, 
              items: itemsWithDetails, 
              amount, 
              paymentMethod 
            } 
          }),
        });

        if (error) {
           console.error("Resend Error:", error);
        } else {
           console.log("Resend Success! Email ID:", data.id);
        }
      } else {
        console.log("No user email found in DB for ID:", userId);
      }
    } catch (error) {
      console.error("Critical Inngest Email Error:", error);
    }
    return { success: true };
  }
);