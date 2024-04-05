import jwt from 'jsonwebtoken';

export const loginSuperAdmin = async (req, res) => {
    const { secretToken } = req.body;

    const SUPER_ADMIN_SECRET = process.env.SUPER_ADMIN_SECRET;

    if (secretToken === SUPER_ADMIN_SECRET) {
        const token = jwt.sign({ role: 'superadmin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.status(200).json({ success: true, token });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}