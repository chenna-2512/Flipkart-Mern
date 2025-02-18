import { Cart } from "../models/cart.model.js";

export const cartItems = async (req, res) => {
    try {
        const { id, title, price, quantity, image} = req.body;

        const existingItem = await Cart.findOne({ id });
        const existingtitle = await Cart.findOne({ title });

        if (existingItem && existingtitle) {
            existingItem.quantity = quantity;
            await existingItem.save();

            res.status(200).json({
                message: "Cart item updated successfully",
                data: existingItem
            });
        } else{
            const newCartItem = new Cart({
                id,
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


export const deleteCartData = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Cart.findByIdAndDelete(itemId);
        if (item) {
          res.status(200).json({ message: "Item removed successfully" });
        } else {
          res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        console.error("Error removing item:", error);
        res.status(500).json({ message: "Failed to remove item" });
    }    
};


export const putdata = async (req, res) => {
    try {
        const { id, title, quantity } = req.body;

        if (!id || quantity === undefined || title === undefined) {
            return res.status(400).json({
                message: "ID and quantity are required",
            });
        }

        if (quantity < 1 || quantity > 10) {
            return res.status(400).json({
                message: "Quantity must be between 1 and 10",
            });
        }

        const item = await Cart.findOne({ id, title });

        if (!item) {
            return res.status(404).json({
                message: "Item not found in the cart",
            });
        }

        item.quantity = quantity;

        await item.save();

        res.status(200).json({
            message: "Quantity updated successfully",
            data: item,
        });
    } catch (error) {
        console.error("Error updating cart quantity:", error);
        res.status(500).json({
            message: "An error occurred while updating the cart",
        });
    }
};
