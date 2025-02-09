import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    category : { type : String, required : true },
    sub_category : { type : String, required : true },
    title : { type : String, required : true },
    description : { type : String, required : true },
    price : { type : Number, required : true },
    rating : {
        rate : { type : Number, required: true },
        count : { type : Number , required : true },
    },
    image : { type : String, required : true },
});

export const Items = mongoose.model("Items",itemsSchema);