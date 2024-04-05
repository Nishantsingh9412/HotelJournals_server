import mongoose from "mongoose";
import { CV } from "../models/profiles/user.js"

const checkForExistingCV = async (req, res, next) => {
    const {id} = req.params;
    const alreadyExistCV = await CV.findOne({ "userId": id });
    if(alreadyExistCV){
        return res.status(400).json({ success: false, message: 'CV already exist' });
    }
    next();
};

export default checkForExistingCV;     // imported in routes/userProfile.js