import express from "express";
import { postAddress } from "../controllers/address.controller.js";

const addressRouter = express.Router();

addressRouter.post("/addresspost",postAddress);

export default addressRouter;