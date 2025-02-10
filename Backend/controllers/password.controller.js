import {User} from "../models/email.model.js";

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