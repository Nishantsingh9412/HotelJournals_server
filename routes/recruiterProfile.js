import express from 'express';
import {
    deleteRecruiterProfile,
    deleteRecruiterProfilePic,
    getRecruiterProfile,
    getRecruiterProfilePic,
    setRecruiterProfile,
    updateRecruiterProfile,
    updateRecruiterProfilePic
} from '../controllers/recProfile.js';



const router = express.Router();
// Create Profile
router.post('/setrecprofile', setRecruiterProfile)
// Get Profile
router.get('/getrecprofile/:id', getRecruiterProfile)
// Update Profile
router.patch('/updaterecprofile/:id', updateRecruiterProfile)
// Delete Profile
router.delete('/deleterecprofile/:id', deleteRecruiterProfile)


// For Profile Pics

// Update Profile Pic
router.patch('/updaterecpic/:id',updateRecruiterProfilePic)
// Get Profile Pic
router.get('/getrecpic/:id',getRecruiterProfilePic)
// Update Profile Pic
router.patch('/deleterecpic/:id',deleteRecruiterProfilePic)


export default router