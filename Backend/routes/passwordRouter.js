import express from "express";
import { emailCheck, updatePassword } from "../controllers/password.controller.js";

const passwordRouter = express.Router();

passwordRouter.post("/emaildata", emailCheck);
passwordRouter.put("/updatepassword", updatePassword);

export default passwordRouter;