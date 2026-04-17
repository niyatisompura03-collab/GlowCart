import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    items: { type: Object, default: {} }
}, { minimize: false })

const Cart = mongoose.models.cart || mongoose.model('cart', cartSchema)

export default Cart;
