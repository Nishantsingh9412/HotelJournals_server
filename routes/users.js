import express from "express";

import { signup, login, forgetPassword, resetPasswordToken } from "../controllers/auth.js";
import {
    getProfile,
    getProfileById,
    updateProfilePic,
    delteProfilePic,
    getProfilePic,
    editProfile,
    deleteProfile
}
    from "../controllers/users.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)

router.post('/forgotpassword', forgetPassword)

router.post('/reset-password/:token', resetPasswordToken)


router.get('/profile', getProfile)
router.get('/profile/:id', getProfileById)

router.patch('/profile/:id', editProfile)
router.delete('/profile/:id', deleteProfile)

router.get('/profile/pic/:id', getProfilePic)
router.patch('/profile/updatepic/:id', updateProfilePic)
router.patch('/profile/deletepic/:id', delteProfilePic)

export default router