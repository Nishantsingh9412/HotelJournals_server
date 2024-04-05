import mongoose from "mongoose";
import { AdditionalInfo } from "../../models/profiles/user.js";

export const setUserAddInfo = async (req, res) => {
    const { title, description , userId} = req.body;
    if (!title) {
        return res.status(400).json({ success: false, message: "Please fill the required fields" })
    }
    try { 
        const newAdditionalInfo = await AdditionalInfo.create({
            title,
            description,
            userId
        })
        if (newAdditionalInfo) {
            return res.status(201).json({ success: true, message: "Additional Info Added Successfully", result: newAdditionalInfo })
        } else {
            return res.status(400).json({ success: false, message: "Failed to create Additional Info" })
        }
    } catch (error) {
        console.log("Error from setUserAddInfo Controller ", error.message)
        return res.status(500).json({ success: false, message: "Something Went Wrong" })
    }
}

export const getUserAddInfo = async (req, res) => {
    const {id : _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Not a Valid Id' })
    }
    try{
        const AdditionalInfoData = await AdditionalInfo.find({"userId":_id});
        if(AdditionalInfoData){
            return res.status(200).json({ success: true, message: "Additional Info Data", result: AdditionalInfoData })
        }else{
            return res.status(400).json({ success: false, message: "No Additional Info Data" })
        }
    }catch(error){
        console.log("Error from getUserAddInfo Controller ", error.message)
        return res.status(500).json({ success: false, message: "Something Went Wrong" })
    }
}

export const editUserAdditionalInfo = async (req, res) => {
    const { id: _id} = req.params;
    const {title,description} = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Not a Valid Id' })
    }
    try{
        const updatedAdditionalInfo = await AdditionalInfo.findByIdAndUpdate(_id,{
            $set : {
                title,
                description
            }
        },{new:true})
        if(updatedAdditionalInfo){
            return res.status(200).json({ success: true, message: "Additional Info Updated Successfully", result: updatedAdditionalInfo })
        }else{
            return res.status(400).json({ success: false, message: "Failed to Update Additional Info" })
        }
    }catch(error){
        console.log("Error from editUserAdditionalInfo Controller ", error.message)
        return res.status(500).json({ success: false, message: "Something Went Wrong" })
    }
}

export const deleteUserAdditionalInfo = async (req, res) => {
    const {id : _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({success:false, message: 'Not a Valid Id'})
    }
    try{
        await AdditionalInfo.findByIdAndDelete(_id);
        return res.status(200).json({success:true,message: 'Additional Info Deleted Successfully'})
    }catch(error){
        console.log("Error from deleteUserAdditionalInfo Controller ", error.message)
        return res.status(500).json({ success: false, message: "Something Went Wrong" })
    }
}

