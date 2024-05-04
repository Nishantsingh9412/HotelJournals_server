import mongoose from "mongoose";
import { Certificates } from "../../models/profiles/user.js";

export const setUserCertification = async (req, res) => {
    const {
        certificate_name,
        issued_by,
        issue_month,
        issue_year,
        // expiration_month,
        // expiration_year,
        credential_id,
        credential_url,
        userId
    } = req.body;
    if (!certificate_name || !issued_by || !issue_month || !issue_year) {
        return res.status(400).json({ success: false, message: "Please fill the required fields" })
    }
    try {
        const newCertificate = await Certificates.create({
            certificate_name,
            issued_by,
            issue_month,
            issue_year,
            // expiration_month,
            // expiration_year,
            credential_id,
            credential_url,
            userId
        })
        if (newCertificate) {
            return res.status(201).json({ success: true, message: "Certificate Added Successfully", result: newCertificate })
        } else {
            return res.status(400).json({ success: false, message: "Failed to create Certificate" })
        }
    } catch (error) {
        console.log("Error from setUserCertification Controller ", error.message)
        return res.status(500).json({ success: false, message: "Something Went Wrong" })
    }
}

export const getUserCertification = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Not a Valid Id' })
    }
    try {
        const CertificateData = await Certificates.find({ "userId": _id });
        return res.status(200).json({ success: true, message: "Certificate Data", result: CertificateData })
    } catch (error) {
        console.log("Error from getUserCertification Controller ", error.message)
        return res.status(500).json({ success: false, message: "Something Went Wrong" })
    }
}

export const DeleteUserCertification = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Not a Valid Id' })
    }
    try {
        await Certificates.findByIdAndDelete(_id);
        return res.status(200).json({ success: true, message: 'Certificate Deleted Successfully' })
    } catch (error) {
        console.log("Error from DeleteUserCertification Controller ", error.message)
        return res.status(500).json({ success: false, message: "Something Went Wrong" })
    }
}

export const EditUserCertification = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Not a Valid Id' })
    }
    const {
        certificate_name,
        issued_by,
        issue_month,
        issue_year,
        // expiration_month,
        // expiration_year,
        credential_id,
        credential_url,
    } = req.body;

    if(!certificate_name || !issued_by || !issue_month || !issue_year) {
        return res.status(400).json({ success: false, message: "Please fill the required fields" })
    }
    
    try {
        const updateCertificate = await Certificates.findByIdAndUpdate(_id, {
            $set: {
                'certificate_name': certificate_name,
                'issued_by': issued_by,
                'issue_month': issue_month,
                'issue_year': issue_year,
                // 'expiration_month': expiration_month,
                // 'expiration_year': expiration_year,
                'credential_id': credential_id,
                'credential_url': credential_url,
            }
        }, { new: true })

        if (updateCertificate) {
            return res.status(200).json({ success: true, message: 'Certificate Updated Successfully', result: updateCertificate })
        } else {
            return res.status(400).json({ success: false, message: 'Failed to update Certificate' })
        }
    }
    catch (error) {
        console.log("Error from EditUserCertification Controller ", error.message)
        return res.status(500).json({ success: false, message: "Something Went Wrong" })
    }
}