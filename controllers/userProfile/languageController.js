import mongoose from "mongoose";
import { Language } from "../../models/profiles/user.js";


// const LanguageSchema = new Schema({
//     language: {type:String,required:true},
//     proficiency: {type:String,required:true},
//     userId: {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
// })


export const setUserLanguage = async (req, res) => {
    const { language, proficiency, userId } = req.body;
    if (!language || !proficiency) {
        return res.status(400).json({ success: false, message: "Please fill the required fields" })
    }
    try {
        const newLanguage = await Language.create({
            language,
            proficiency,
            userId
        })
        if (newLanguage) {
            return res.status(201).json({ success: true, message: "Language Added Successfully", result: newLanguage })
        } else {
            return res.status(400).json({ success: false, message: "Failed to create Language" })
        }

    } catch (error) {
        console.log("Error from setUserLanguage Controller ", error.message)
        return res.status(500).json({ success: false, message: "Something Went Wrong" })
    }

}

export const getUserLanguage = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Not a Valid Id' })
    }
    try {
        const LanguageData = await Language.find({ "userId": _id });
        return res.status(200).json({ success: true, message: "Language Data", result: LanguageData })
    } catch (error) {
        console.log("Error from getUserLanguage Controller ", error.message)
        return res.status(500).json({ success: false, message: "Something Went Wrong" })
    }
}

export const EditUserLanguage = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Not a Valid Id' })
    }
    const { language, proficiency } = req.body;
    if (!language || !proficiency) {
        return res.status(400).json({ success: false, message: 'Please fill the required fields' })
    }
    try {
        const updatedLanguage = await Language.findByIdAndUpdate(_id, {
            $set: {
                language,
                proficiency
            }
        }, { new: true })

        if(updatedLanguage){
            return res.status(200).json({ success: true, message: "Language Updated Successfully", result: updatedLanguage })
        }else{
            return res.status(400).json({ success: false, message: "Failed to update Language" })
        }
    }catch(error){
        console.log("Error from EditUserLanguage Controller ", error.message)
        return res.status(500).json({ success: false, message: "Something Went Wrong" })
    }
}

export const DeleteUserLanguage = async (req, res) => {
    const {id : _id} = req.params;  
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({success:false,message:'Not a Valid Id'})
    }
    try{
        await Language.findByIdAndDelete(_id);
        return res.status(200).json({success:true,message:'Language Deleted Successfully'})
    }catch(erorr){
        console.log("Error from DeleteUserLanguage Controller ", error.message)
        return res.status(500).json({ success: false, message: "Something Went Wrong" })
    }
}

