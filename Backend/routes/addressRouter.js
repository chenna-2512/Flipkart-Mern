import express from "express";
import { getAddress, postAddress } from "../controllers/address.controller.js";

const addressRouter = express.Router();

addressRouter.post("/addresspost",postAddress);
addressRouter.get("/addressget",getAddress);

export default addressRouter;