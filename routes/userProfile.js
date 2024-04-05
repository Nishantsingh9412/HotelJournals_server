import express from 'express';
import multer from "multer";

import { DeleteProfile, EditProfile, getUserProfile, setUserProfile } from '../controllers/userProfile/introduction.js';
import { DeleteExperience, EditExperience, getUserExperience, setUserExperience } from '../controllers/userProfile/experienceController.js';
import { DeleteEducation, UpdateEducation, getUserEducation, setUserEducation } from '../controllers/userProfile/educationControler.js';
import { DeleteSkills, EditSkills, getUserSkills, setUserSkills } from '../controllers/userProfile/skillsController.js';
import { DeleteUserCertification, EditUserCertification, getUserCertification, setUserCertification } from '../controllers/userProfile/certificatesController.js';
import { DeleteUserLanguage, EditUserLanguage, getUserLanguage, setUserLanguage } from '../controllers/userProfile/languageController.js';
import { deleteUserAdditionalInfo, editUserAdditionalInfo, getUserAddInfo, setUserAddInfo } from '../controllers/userProfile/additionalInfoController.js';
import { DeleteUserCv, getUserCv, setUserCv, updateUserCv } from '../controllers/userProfile/uploadCVcontroller.js';
// Middleware
import checkForExistingCV from '../middleware/resumeUpload.js';
// import {}

const router = express.Router();

// Introduction Section Routes
router.post('/setProfile', setUserProfile)
router.get('/getProfile/:id', getUserProfile)
router.delete('/deleteProfile/:id', DeleteProfile)
router.patch('/editProfile/:id', EditProfile)

// Experience Section Routes
router.post('/setExperience', setUserExperience)
router.get('/getExperience/:id', getUserExperience)
router.delete('/deleteExperience/:id', DeleteExperience)
router.patch('/editExperience/:id', EditExperience)

// Education Section routes
router.post('/setEducation', setUserEducation)
router.get('/getEducation/:id', getUserEducation)
router.patch('/edituserEducation/:id', UpdateEducation)
router.delete('/deleteEducation/:id', DeleteEducation)

// Skills Section routes
router.post('/setSkills', setUserSkills)
router.get('/getSkills/:id', getUserSkills)
router.delete('/deleteSkills/:id', DeleteSkills)
router.patch('/editSkills/:id', EditSkills)


// Certification Section routes
router.post('/setCertification', setUserCertification)
router.get('/getCertification/:id', getUserCertification)
router.delete('/deleteCertification/:id', DeleteUserCertification)
router.patch('/editCertification/:id', EditUserCertification)

// Language Section routes
router.post('/setLanguage', setUserLanguage)
router.get('/getLanguage/:id', getUserLanguage)
router.patch('/editLanguage/:id', EditUserLanguage)
router.delete('/deleteLanguage/:id', DeleteUserLanguage)

// Additional Information Routes
router.post('/setAddInfo', setUserAddInfo)
router.get('/getAddInfo/:id', getUserAddInfo)
router.patch('/editAddInfo/:id', editUserAdditionalInfo)
router.delete('/deleteAdditionalInfo/:id', deleteUserAdditionalInfo)

// Upload CV    

// For image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/resumes/');
    },
    filename: function (req, file, cb) {
        const sanitizedFilename = file.originalname.replace(/\s/g, '_');
        cb(null, new Date().toISOString().replace(/[:.]/g, '_') +sanitizedFilename)
    }
});

// for selecting file type discarding all other files except doc and docx and pdf
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'application/msword'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// for file size limit
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post('/uploadCV/:id',checkForExistingCV,upload.single('cv'),setUserCv);
router.get('/getCV/:id',getUserCv);
router.patch('/updateCV/:id',upload.single('cv'),updateUserCv);
router.delete('/deleteCV/:id',DeleteUserCv);


export default router;