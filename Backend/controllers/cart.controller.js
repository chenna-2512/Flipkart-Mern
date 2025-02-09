// import { products } from "../data.js";
import { Cart } from "../models/cart.model.js";

export const cartItems = async (req, res) => {
    try {
        const { title, price, quantity, image} = req.body;

        const existingItem = await Cart.findOne({ title });

        if (existingItem) {
            existingItem.quantity = quantity;
            await existingItem.save();

            res.status(200).json({
                message: "Cart item updated successfully",
                data: existingItem
            });
        } else{
            const newCartItem = new Cart({
                title,
                price,
                quantity,
                image
            })

            await newCartItem.save();

            res.status(201).json({
                message: "Item is added to cart successfully",
                data:newCartItem
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};


export const getCartData = async (req,res) => {
    try{
        const cartdata = await Cart.find({});

        res.status(200).json({
            message:"Data Fetched Successfully",
            data : cartdata
        });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            message:"Data not there"
        })
    }
}