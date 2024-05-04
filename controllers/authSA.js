import jwt from 'jsonwebtoken';
import User from '../models/auth.js';

export const loginSuperAdmin = async (req, res) => {
    const { secretToken } = req.body;

    const SUPER_ADMIN_SECRET = process.env.SUPER_ADMIN_SECRET;

    if (secretToken === SUPER_ADMIN_SECRET) {
        const superadminUser = await User.findOne({ email: process.env.SUPER_ADMIN_HARCODED_MAIL }).select('-password -joinedOn');
        const token = jwt.sign({ role: 'superadmin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const special_token = process.env.SPECIAL_TOKEN;
        return res.status(200).json({ success: true, result:superadminUser ,token , special_token});
    } else {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}