import express from "express";
import { cartItems, deleteCartData, getCartData } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/cartpost",cartItems);
cartRouter.get("/getcartitems",getCartData);
cartRouter.delete("/deletedata/:id",deleteCartData)

export default cartRouter;