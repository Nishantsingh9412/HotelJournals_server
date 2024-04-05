import mongoose from 'mongoose';
import {UserEducation} from '../../models/profiles/user.js';

export const setUserEducation = async (req, res) => {
    const { school, city, degree, start_date, end_date, description, userId } = req.body;
    try {
        if (!school || !city || !degree || !start_date || !end_date) {
            return res.status(400).json({ message: "Please fill the required fields " })
        }
        const newEducation = await UserEducation.create({
            school,
            city,
            degree,
            start_date,
            end_date,
            description,
            userId
        })
        if (newEducation) {
            return res.status(200).json({ success: true, message: 'Education Added Successfully', result: newEducation })
        } else {
            return res.status(400).json({ success: false, message: 'Failed to create Education' })
        }
    } catch (error) {
        console.log("Error from setUserEducation Controller ", error.message)
        return res.status(500).json({ success: false, message: 'Failed to create Education' })
    }
    // return res.status(200).json({ message: "This is setUserEducation" })
}

export const getUserEducation = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'No Education with that id' })
    }
    try {
        const EducationData = await UserEducation.find({ "userId": _id });
        res.status(200).json({ success: true, message: "Education Data", result: EducationData })
    } catch (error) {
        console.log("Error from getUserEducation Controller ", error.message)
        return res.status(500).json({ success: false, message: "Failed to get Education" })
    }
    // return res.status(200).json({ message: "This is getUserEducation" })
}

export const DeleteEducation = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'No Education with that id' })
    }
    try {
        await UserEducation.findByIdAndDelete(_id);
        res.status(200).json({ success: true, message: 'Education Deleted Successfully' })
    } catch (error) {
        console.log("Error from DeleteEducation Controller ", error.message)
        return res.status(500).json({ success: false, message: 'something went wrong' })
    }
}

export const UpdateEducation = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'No education with that id ' })
    }
    const { school, city, degree, start_date, end_date, description } = req.body;
    if (!school || !city || !degree || !start_date || !end_date) {
        return res.status(400).json({ success: false, message: 'Please fill all fields' })
    }
    try {
        const updatedEducation = await UserEducation.findByIdAndUpdate(_id, {
            $set: {
                'school':school,
                'city':city,
                'degree':degree,
                'start_date':start_date,
                'end_date':end_date,
                'description':description,
            }
        }, { new: true })

        if(updatedEducation){
            return res.status(200).json({success:true,message:'Education Updated Successfully',result:updatedEducation})
        }else{
            return res.status(400).json({success:false,message:'Failed to update Education'})
        }
    } catch (error) {
        console.log("Error from UpdateEducation Controller ", error.message)
        return res.status(500).json({ success: false, message: 'Something went wrong'})
    }
}
