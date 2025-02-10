import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    id : { type : String, required : true },
    title : { type : String, required : true },
    price : { type : Number, required : true },
    quantity : { type : Number, required : true },
    image : { type : String, required : true },
});

export const Cart = mongoose.model("Cart",cartSchema);