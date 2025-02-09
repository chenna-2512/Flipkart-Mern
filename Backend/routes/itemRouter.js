import express from "express";
import { postItems } from "../controllers/item.controller.js";

const itemRouter = express.Router();

itemRouter.get("/postitems",postItems)

export default itemRouter;