import { Address } from "../models/address.model.js";


export const postAddress = async (req,res) => {
    try{
        const { id, name, phoneno, pincode, locality, address, city, landmark } = req.body;

        // const existingId = await Address.findOne({ id });
        // const existingName = await Address.findOne({ name });

        const newAddress = await Address({
            id,
            name,
            phoneno,
            pincode,
            locality,
            address,
            city,
            landmark,
        })

        await newAddress.save();

        res.status(200).json({
            message : "Address Added Successfully",
            data : newAddress,
        });
    }
    catch(error){
        res.status(400).json({
            message : "Server error"
        });
    }
}