import mongoose from 'mongoose';
import UserProfile from '../../models/profiles/user.js';

//  For Introduction

export const setUserProfile = async (req, res) => {
    try {
        const { introduction, userId } = req.body;
        if (!introduction)
            return res.status(400).json({ success: false, message: "All fields are required" });
        else {
            const newIntro = await UserProfile.create({
                introduction,
                userId
            });
            if (newIntro) {
                res.status(201).json({ success: true, message: 'Introduction Added Successfully', result: newIntro });
            } else {
                res.status(400).json({ success: false, message: 'failed to create Introduction' })
            }
        }
    } catch (error) {
        console.log("Error from setUserProfile Controller ", error.message)
        res.status(500).json({ success: false, message: "Failed to create user profile" })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ success: false, message: 'No Profile with that id' })
        } else {
            const singleUserProfile = await UserProfile.findOne({ "userId": _id });
            res.status(200).json({ success: true, message: 'User Profile Data', result: singleUserProfile })
        }
    } catch (error) {
        console.log("Error from getUserProfile Controller ", error.message)
        res.status(500).json({ success: false, message: 'something went wrong' })
    }
}

export const DeleteProfile = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'No Profile with that id' })
    }
    try {
        await UserProfile.findOneAndDelete({ "userId": _id })
        res.status(200).json({ success: true, message: 'Profile Deleted Successfully' })
    } catch (error) {
        console.log("Error from DeleteProfile Controller ", error.message)
        res.status(500).json({ success: false, message: 'something went wrong' })
    }
}

export const EditProfile = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'No Profile with that id' })
    }
    const { introduction } = req.body;
    try {
        const updatedProfile = await UserProfile.findOneAndUpdate({ "userId": _id } ,{
            $set: {
                'introduction': introduction
            }
        }, { new: true });

        if (!updatedProfile) {
            return res.status(400).json({ success: false, message: 'Failed to update Profile' })
        } else {
            return res.status(200).json({ success: true, message: 'Profile Updated Successfully', result: updatedProfile })
        }
    } catch (error) {
        console.log("Error from editProfile Controller ", error.message)
        res.status(500).json({ success: false, message: 'something went wrong' })
    }
}

