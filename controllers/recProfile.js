import mongoose from 'mongoose'
import RecruiterProfile from '../models/profiles/recruiter.js'

export const setRecruiterProfile = async (req, res) => {
    const {
        companyName,
        Designation,
        numberOfEmployees,
        HeadQuarters,
        industryType,
        companyType,
        companyWebsite,
        CompanyDescription,
        CompanysTagline,
        twitter,
        linkedIn,
        company_logo,
        created_by
    } = req.body

    try {
        if (!companyName ||
            !Designation ||
            !HeadQuarters ||
            !industryType ||
            !companyType ||
            !CompanyDescription
        ) {
            return res.status(400).json({ status: true, message: "Please Fill Mandatory Fields" })
        } else {
            const newRecruiterProfile = await RecruiterProfile.create({
                companyName,
                Designation,
                numberOfEmployees,
                HeadQuarters,
                industryType,
                companyType,
                companyWebsite,
                CompanyDescription,
                CompanysTagline,
                twitter,
                linkedIn,
                company_logo,
                created_by
            });
            if (newRecruiterProfile) {
                return res.status(201).json({ success: true, message: "Recruiter Profile Created Successfully", result: newRecruiterProfile })
            } else {
                return res.status(400).json({ success: false, message: "Failed to create Recruiter Profile" })
            }
        }
    } catch (error) {
        console.log("Error From Recruiter Profile Controller", error.message);
        return  res.status(500).json({ success: false, message: `Something went wrong from server ${error.message}` })
    }
}
// Get Profile
export const getRecruiterProfile = async (req, res) => {
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ success: false, message: 'Not a Valid Id' })
    }
    try {
        const singleRecProfile = await RecruiterProfile.find({ "created_by": _id }).populate('created_by','-password');
        return res.status(200).json({
            success: true,
            message: "Recruiter Profile Fetched Successfully",
            result: singleRecProfile
        })
    } catch (error) {
        console.log("Error From Recruiter Profile Controller", error.message);
        return res.status(500).json({ success: false, message: `Something went wrong from server ${error.message}` })
    }
}

export const updateRecruiterProfile = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Not a Valid Id" })
    }
    const {
        companyName,
        Designation,
        numberOfEmployees,
        HeadQuarters,
        industryType,
        companyType,
        companyWebsite,
        CompanyDescription,
        CompanysTagline,
        twitter,
        linkedIn,
        company_logo,
    } = req.body

    if (!companyName ||
        !Designation ||
        !HeadQuarters ||
        !industryType ||
        !companyType ||
        !CompanyDescription
    ) {
        return res.status(400).json({ status: true, message: "Please Fill Mandatory Fields" })
    }

    try {
        const RecruiterProfileupdated = await RecruiterProfile.findOneAndUpdate
            ({ "created_by": _id }, {
                $set: {
                    'companyName': companyName,
                    'Designation': Designation,
                    'numberOfEmployees': numberOfEmployees,
                    'HeadQuarters': HeadQuarters,
                    'industryType': industryType,
                    'companyType': companyType,
                    'companyWebsite': companyWebsite,
                    'CompanyDescription': CompanyDescription,
                    'CompanysTagline': CompanysTagline,
                    'twitter': twitter,
                    'linkedIn': linkedIn,
                    'company_logo': company_logo
                }
            }, { new: true })
        if (RecruiterProfileupdated) {
            return res.status(200).json({
                success: true,
                message: "Recruiter Profile Updated Successfully",
                result: RecruiterProfileupdated
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Failed to Update Recruiter Profile"
            })
        }
    } catch (error) {
        console.log("Error From Recruiter Profile Controller", error.message);
        return res.status(500).json({ success: false, message: `Something went wrong from server ${error.message}` })
    }
}

export const deleteRecruiterProfile = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Not a Valid Id' })
    }
    try {
        const recruiterDeleted = await RecruiterProfile.findOneAndDelete({ "created_by": _id });
        if (!recruiterDeleted) {
            return res.status(400).json({ success: false, message: 'Failed to delete Recruiter Profile' })
        } else {
            return res.status(200).json({ success: true, message: 'Recruiter Profile DELETED' })
        }
    } catch (error) {
        console.log("Error From Recruiter Profile Controller", error.message);
        return res.status(500).json({ success: false, message: `Something went wrong from server ${error.message}` })
    }

}

export const updateRecruiterProfilePic = async (req, res) => {
    const { id: _id } = req.params;
    const { pic } = req.body;
    if (!pic) {
        return res.status(400).json({ success: false, message: 'Please select a picture' })
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Invalid Id' })
    }
    try {
        const recruiterPic = await RecruiterProfile.findOneAndUpdate({ "created_by": _id }, {
            $set: {
                'company_logo': pic
            }
        }, { new: true });

        if (!recruiterPic) {
            return res.status(400).json({ success: false, message: 'Failed to update picture' })
        } else {
            return res.status(200).json({ success: true, message: 'Recruiter Profile Pic Updated', result: recruiterPic })
        }
    } catch {
        return res.status(500).json({ success: false, message: `Something went wrong` });
    }
}

export const getRecruiterProfilePic = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Invalid Id' })
    }
    try {
        const getProfilePic = await RecruiterProfile.findOne({ "created_by": _id }).select('company_logo');
        if (!getProfilePic) {
            return res.status(400).json({ success: false, message: 'Failed to get picture' })
        } else {
            return res.status(200).json({ success: true, message: 'Recruiter Profile Pic Fetched', result: getProfilePic })
        }
    } catch (error) {
        console.log("Error From Get Recruiter Profile Controller", error.message);
        return res.status(500).json({ success: false, message: `Something went wrong` });
    }
}

export const deleteRecruiterProfilePic = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Invalid Id' })
    }
    try {
        const deleteProfilePic = await RecruiterProfile.findOneAndUpdate({ "created_by": _id }, {
            $set: {
                'company_logo': 'https://res.cloudinary.com/dwahql1jy/image/upload/v1711122304/dummy_image_kji5nv.jpg'
            }
        }, { new: true });
        if (!deleteProfilePic) {
            return res.status(400).json({ success: false, message: 'Failed to delete picture' })
        } else {
            return res.status(200).json({ success: true, message: 'Recruiter Profile Pic Deleted', result: deleteProfilePic })
        }

    } catch (error) {
        console.log("Error From Delete Recruiter Profile Controller", error.message);
        return res.status(500).json({ success: false, message: `Something went wrong` })
    }
}


