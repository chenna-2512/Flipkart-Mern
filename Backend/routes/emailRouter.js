import express from "express";
import { postData } from "../controllers/email.controller.js";

const router = express.Router();

router.post("/postemail",postData);


export default router;