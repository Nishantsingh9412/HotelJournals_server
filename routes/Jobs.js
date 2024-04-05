import express from 'express';

import {
    DeleteJob,
    applyJob,
    editJob,
    getAllJobs,
    getSingleJob,
    postJobs,
    updateCandidateStatus,
    filterJobs,
    VerifyJobs,
    rejectJobs,
    getAllJobsForSuperAdmin,
    getAllJobsRecruiter,
    getAllJobsLazyLoading
    // hiredCandParticularJob,
    // notOfferedCandPartJob,
    // offeredCandParticularJob,
    // rejCandParticularJob,
} from '../controllers/jobs.js';

const router = express.Router();

// get Alljobs Verified Lazy Loading Main Page
router.get('/lazy-loading-jobs', getAllJobsLazyLoading)


// get jobs for recruiter
router.get('/recruiter/:id', getAllJobsRecruiter)


// Get Jobs for recruiter status Wise (Hired Jobs)
// router.get('/recruiter/hired/:id', hiredCandParticularJob)

// Get Jobs for recruiter status Wise (Rejected Jobs)
// router.get('/recruiter/rejected/:id', rejCandParticularJob)

// Get Jobs for recruiter status Wise (Offered Jobs)
// router.get('/recruiter/offered/:id', offeredCandParticularJob)

// Get Jobs for recruiter status Wise (Not Offered Jobs)
// router.get('/recruiter/notOffered/:id', notOfferedCandPartJob)

// Verify Jobs SuperAdmin
router.patch('/verifyjob/:id', VerifyJobs)

// Reject Jobs SuperAdmin
router.patch('/rejectjob/:id', rejectJobs)

// Create Filter Section 
router.get('/filter',filterJobs)

// Update candidate status
router.patch('/updatestatus', updateCandidateStatus)
// Apply for a job
router.patch('/applyjob', applyJob)
// Add a new Job
router.post('/createjob', postJobs)
// get all Jobs
router.get('/alljobs', getAllJobs)

router.get('/alljobsforsuperadmin', getAllJobsForSuperAdmin)

// get a single Job
router.get('/singlejob/:id', getSingleJob)
// Delete a single Job
router.delete('/singlejob/:id', DeleteJob)
// Edit a job
router.patch('/singlejob/:id', editJob)






export default router