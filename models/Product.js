import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId: {type: String, require: true, ref: "user"},
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    offerPrice: {type: Number, require: true},
    category: {type: String, require: true},
    image: {type: Array, require: true},
    date: {type: Number, require: true},
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product