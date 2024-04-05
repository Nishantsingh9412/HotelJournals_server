import mongoose from "mongoose";
import { Experience } from "../../models/profiles/user.js";

export const setUserExperience = async (req, res) => {
    const {
        jobTitle,
        company,
        department,
        city,
        job_start_date,
        job_end_date,
        is_current_job,
        jobExperience,
        userId
    } = req.body;

    try {
        if (!jobTitle || !company || !department || !city || !job_start_date || !userId) {
            return res.status(400).json({ message: "Please fill the required fields " })
        } else {
            const newExperience = await Experience.create({
                jobTitle,
                company,
                department,
                city,
                job_start_date,
                job_end_date,
                is_current_job,
                jobExperience,
                userId
            });
            if (newExperience) {
                return res.status(201).json({ success: true, message: "Experience Added Successfully", result: newExperience })
            } else {
                return res.status(400).json({ success: false, message: "Failed to create Experience" })
            }
        }
    } catch (error) {
        console.log("Error from setUserExperience Controller ", error.message)
        return res.status(500).json({ success: false, message: "Failed to create Experience" })
    }
}


export const getUserExperience = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'No Experience with that id' })
    }
    try {
        const ExperienceData = await Experience.find({ "userId": _id });
        res.status(200).json({ success: true, message: "Experience Data", result: ExperienceData })
    } catch (error) {
        console.log("Error from getUserExperience Controller ", error.message)
        return res.status(500).json({ success: false, message: "Failed to get Experience" })
    }
}

export const DeleteExperience = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'No Experience with that id' })
    }
    try {
        await Experience.findByIdAndDelete(_id);
        res.status(200).json({ success: true, message: "Experience Deleted Successfully" })

    } catch (error) {
        console.log("Error from DeleteExperience Controller ", error.message)
        return res.status(500).json({ success: false, message: "Failed to delete Experience" })
    }
}


export const EditExperience = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'No Experience with that id' })
    }
    const {
        jobTitle,
        company,
        department,
        city,
        job_start_date,
        job_end_date,
        is_current_job,
        jobExperience } = req.body;

    try {
        const updatedExp = await Experience.findByIdAndUpdate(_id, {
            $set: {
                'jobTitle': jobTitle,
                'company': company,
                'department': department,
                'city': city,
                'job_start_date': job_start_date,
                'job_end_date': job_end_date,
                'is_current_job': is_current_job,
                'jobExperience': jobExperience,
            }
        }, { new: true })

        if (updatedExp) {
            return res.status(200).json({ success: true, message: "Experience Updated Successfully", result: updatedExp })
        } else {
            return res.status(400).json({ success: false, message: "Failed to update Experience" })
        }

    } catch (error) {
        console.log("Error from EditExperience Controller ", error.message)
        return res.status(500).json({ success: false, message: "Failed to update Experience" })
    }
}