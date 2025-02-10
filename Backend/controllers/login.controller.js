import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../models/email.model.js"

export const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);
    try {
      if (!email || !password) {
        return res.status(409).json({ message: "Missing Credentials" });
      }
      const user = await User.findOne({ email });
      // console.log(user);
      if (!user) {
        return res.status(409).json({ message: "User not exist Signup again!!" });
      }
      const CorrectUser = await bcrypt.compare(password, user.password);
      // console.log(password);
      // console.log(user.password);
      // console.log(CorrectUser);
      if (!CorrectUser) {
        return res.status(409).json({ message: "Incorrect password" });
      }
      const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
        expiresIn: "1m",
      });
      const Loggeduser={
        username: user.username,
        email: user.email,
        id: user._id,
        token:token
      }
      // console.log(token);
      return res.status(201).json({
        message: "LoggedIn Successfully",Loggeduser});
    } catch (err) {
      return res.status(404).json({ message: "Data not found", err });
    }
  };