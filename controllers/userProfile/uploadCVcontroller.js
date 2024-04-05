import mongoose from "mongoose";
import fs from "fs";
import { CV } from "../../models/profiles/user.js";

export const setUserCv = async (req, res) => {
    try {
        const { id } = req.params;
        const { path } = req.file;
        if(!path){
            return res.status(400).json({ success: false, message: 'Upload a CV first' });
        }
        const newCV = await CV.create({ cv_db: path, userId: id })
        if (newCV) {
            return res.status(201).json({ success: true, message: 'CV Added Successfully', result: newCV })
        } else {
            return res.status(400).json({ success: false, message: 'CV not added' })
        }
    } catch (error) {
        console.log('Error from setUserCv controller: ', error.message);
        return res.status(500).json({ success: false, message: `Something went wrong from server: ${error.message}` });
    }
}

export const getUserCv = async (req, res) => {
    try {
        const { id } = req.params;
        const userCV = await CV.findOne({ "userId": id });
        if (userCV) {
            return res.status(200).json({ success: true, message: 'CV Fetched Successfully', result: userCV })
        } else {
            return res.status(400).json({ success: false, message: 'CV not found' })
        }
    } catch (error) {
        console.log('Error from getUserCv controller: ', error.message);
        return res.status(500).json({ success: false, message: `Something went wrong from server: ${error.message}` });
    }
}

export const updateUserCv = async (req, res) => {
    const { id: _id } = req.params;
    const cvPath = req.file.path;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({ success: false, message: 'Not a valid Id' });
    }
    if(!cvPath){
        return res.status(400).json({ success: false, message: 'Upload a CV first' });
    }
    try {
        // Unlinking the old CV file (Deleting that) and updating the new CV path
        const oldCV = await CV.findOne({ "userId": _id });
        if (!oldCV) {
            return res.status(400).json({ success: false, message: 'CV not found' })
        }
        // Deleting the old CV file
        fs.unlink(oldCV.cv_db, (err) => {
            if (err) {
                console.error(`Error deleting old CV: ${err}`);
            } else {
                console.log('Old CV deleted successfully');
            }
        })

        // updating the new CV Path with the new CV path

        const updatedCV = await CV.findOneAndUpdate({ "userId": _id }, {
            $set: {
                cv_db: cvPath
            }
        }, { new: true });

        if (!updatedCV) {
            return res.status(400).json({ success: false, message: 'CV not found' });
        } else {
            return res.status(200).json({ success: true, message: 'CV updated successfully', result: updatedCV });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error updating CV', error });
    }
}

export const DeleteUserCv = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Not a valid Id' });
    }

    try {
        const oldCV = await CV.findOne({ "userId": _id });
        if (!oldCV) {
            return res.status(400).json({ success: false, message: 'CV not found' })
        }
        // Deleting the old CV file
        fs.unlink(oldCV.cv_db, (err) => {
            if (err) {
                console.error(`Error deleting old CV: ${err}`);
            } else {
                console.log('Old CV deleted successfully');
            }
        })

        await CV.findOneAndDelete({ "userId": _id });
        return res.status(200).json({ success: true, message: 'CV Deleted Successfully' });
    } catch (error) {
        console.log('Error from DeleteUserCv controller: ', error.message);
        return res.status(500).json({ success: false, message: error.message })
    }
}