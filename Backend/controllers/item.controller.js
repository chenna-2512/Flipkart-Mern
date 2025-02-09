import { products } from "../data.js";
import { Items } from "../models/item.model.js";

export const postItems = async (req, res) => {
    try {
        await Items.deleteMany({});
         const allProducts= await Items.insertMany(products);

        res.status(201).json({
            message: "Products added successfully!",
            data:allProducts
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};
