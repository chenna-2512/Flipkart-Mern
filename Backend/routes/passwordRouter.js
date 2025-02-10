import express from "express";
import { emailCheck } from "../controllers/password.controller.js";

const passwordRouter = express.Router();

passwordRouter.post("/emaildata", emailCheck);

export default passwordRouter;