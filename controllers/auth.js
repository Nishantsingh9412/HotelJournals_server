import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import users from '../models/auth.js'
import { mailFunctionByMailData } from './mail.js';

export const signup = async (req, res) => {
    const { firstName, lastName, email, password,
        confirmPassword, country_code, phone_no, user_type } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            console.log("user Already Exists");
            return res.status(401).json({ success: false, message: 'User Already Exists ' })
        }
        if (!firstName || !lastName || !email || !password
            || !confirmPassword || !country_code || !phone_no || !user_type) {
            console.log("Please fill all the fields . ");
            return res.status(401).json({ success: false, message: 'Please fill all the fields  ' })
        }
        if (password !== confirmPassword) {
            console.log("Password doesn't match");
            return res.status(401).json({ success: false, message: 'Password does not match ' })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await users.create({ fname: firstName, lname: lastName, email, password: hashedPassword, country_code, phone: phone_no, userType: user_type });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.status(201).json({ success: true, result: newUser, token })
    } catch (err) {
        // return res.status(500).json({ success: false, message: `Something went wrong from server: ${err.message}` });
        return res.status(500).json({ success: false, message: ` Something went wrong ` });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        console.log(existingUser);
        if (!email || !password) {
            console.log("Please fill all the fields . ");
            return res.status(401).json({ success: false, message: 'Please fill all the fields ' })
        }
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'Please Create Account' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: 'Invalid Credentials' });
        } else {
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            return res.status(200).json({ success: true, result: existingUser, token })
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: `Something went wrong ` });
    }
}





export const forgetPassword = async (req, res) => {
    const { mail } = req.body;
    console.log("mail -------------------------------------------------------> ", mail);
    try {
        const existingUser = await users.findOne({ email: mail })
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '10m' })

        const mailData = {
            to: mail,
            subject: "Reset Password",
            text: "Reset Password",
            html: `
                <h1>Click on the link to reset your password</h1>
                <a href="${process.env.CLIENT_URL}/reset-password/${token}">Reset Password</a>
                <p>The link will expire in 10 minutes.</p>
                <p>If you didn't request a password reset, please ignore this email.</p>`
        }

        mailFunctionByMailData(mailData).then((result) => {
            if(result.success){
                return res.status(200).json({ success: true, message: "Email sent successfully" })
            } 
        }).catch((err) => {
            console.log('Error in forgetPassword', err);
            return res.status(500).json({ success: false, message: "Internal Server Error" })
        })
    } catch (err) {
        console.log("Error in forgetPassword", err);
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const resetPasswordToken = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" })
        }

        const existingUser = await users.findById({ _id: decodedToken.userId });
        console.log('this is the existing user', existingUser)
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not exists" })
        }
        // Hashing new password 
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        existingUser.password = hashedPassword;
        await existingUser.save();
        // Send success response
        res.status(200).send({ message: "Password updated" });

    } catch (err) {
        console.log("Error in resetPasswordToken", err);
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}
