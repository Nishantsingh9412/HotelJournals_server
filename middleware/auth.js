import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }
        const token = authHeader.split(' ')[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = decodedData?.id;
        next();
    } catch (error) {
        console.log("from auth middleware " +  error.message);
    }
}

export default auth;