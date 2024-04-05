import mongoose from "mongoose";
import { Skills } from "../../models/profiles/user.js";

export const setUserSkills = async (req, res) => {
    const { skills, userId } = req.body;
    if (!skills) {
        return res.status(400).json({ success: false, message: "Please fill the required fields" })
    } else {
        try {
            const newSkills = await Skills.create({
                skills,
                userId
            })
            if (newSkills) {
                return res.status(201).json({ success: true, message: "Skills Added Successfully", result: newSkills })
            } else {
                return res.status(400).json({ success: false, message: "Failed to create Skills" })
            }
        } catch (error) {
            console.log("Error from setUserSkills Controller ", error.message)
            return res.status(500).json({ success: false, message: "Something Went Wrong" })
        }
    }
}

export const getUserSkills = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'No Skills with that id' })
    }
    try {
        const SkillsData = await Skills.find({ "userId": _id });
        return res.status(200).json({ success: true, message: "Skills Data", result: SkillsData })
    } catch (error) {
        console.log("Error from getUserSkills Controller ", error.message)
        return res.status(500).json({ success: false, message: "Something Went Wrong" })
    }
}

export const DeleteSkills = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'No Skills with that id' })
    }
    try {
        await Skills.findByIdAndDelete(_id);
        return res.status(200).json({ success: true, message: 'Skills Deleted Successfully' })
    } catch (error) {
        console.log("Error from DeleteSkills Controller ", error.message)
        return res.status(500).json({ success: false, message: 'Something Went Wrong' })
    }
}

export const EditSkills = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'No Skills with that id' })
    }
    const { skills } = req.body;
    if (!skills) {
        return res.status(400).json({ success: false, message: "Please fill the required fields" })
    }
    try {
        const updatedSkills = await Skills.findByIdAndUpdate(_id, 
            {
                $set:{
                    'skills': skills
                }
            },{ new: true });
        if (updatedSkills) {
            return res.status(200).json({ success: true, message: "Skills Updated Successfully", result: updatedSkills })
        } 
        else {
            return res.status(400).json({ success: false, message: "Failed to update Skills" })
        }
    } catch (error) {
        console.log("Error from EditSkills Controller ", error.message)
        return res.status(500).json({ success: false, message:error.message })
    }
}