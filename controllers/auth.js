import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import users from '../models/auth.js'

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

