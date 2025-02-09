import express from "express";
import { cartItems, getCartData } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/cartpost",cartItems);
cartRouter.get("/getcartitems",getCartData);

export default cartRouter;