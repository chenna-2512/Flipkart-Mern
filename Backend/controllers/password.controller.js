import {User} from "../models/email.model.js";
import bcrypt from "bcrypt";

export const emailCheck = async (req,res) => {
    try{
        const { email } = req.body;
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not exist Signup again!!" });
        }

        res.status(201).json({
            message:"Email exists",
            data : user,
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            message:"Error Occurred"
        })
    }
}


export const updatePassword = async (req,res) => {
    try{
        const { email,password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                message : "User not exist signup again"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            message : "Password Updated Successfully",
            data : user,
        });

    }catch(error){
        console.err(error);
        res.status(400).json({
            message : "Something Error Occured"
        })
    }
}