import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import router from "./routes/emailRouter.js";
import itemRouter from "./routes/itemRouter.js";
import cartRouter from "./routes/cartRouter.js";
import cors from "cors";
import loginrouter from "./routes/loginRouter.js";
import passwordRouter from "./routes/passwordRouter.js";
import addressRouter from "./routes/addressRouter.js";

dotenv.config();  // Load environment variables

const app = express();
app.use(express.json());

// Ensure MongoDB URL is loaded
const url = process.env.MONGO_URL;
if (!url) {
  console.error("MONGO_URL is missing in .env file!");
  process.exit(1);
}

console.log("MongoDB URL:", url); // Debugging

// Connect to MongoDB
mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); 
  });

app.use(cors());
app.use(express.json());  
app.use(router);
app.use(express.static('public'));
app.use(itemRouter);
app.use(cartRouter);
app.use(loginrouter);
app.use(passwordRouter);
app.use(addressRouter)

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
}); 
