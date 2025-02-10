import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    id : { type : String , required : true },
    name : { type : String, required : true },
    phoneno : { type : String , required : true },
    pincode : { type : String , required : true },
    locality : { type : String , required : true },
    address : { type : String , required : true },
    city : { type : String , required : true },
    landmark : { type : String },
})

export const Address = mongoose.model("Address",addressSchema);