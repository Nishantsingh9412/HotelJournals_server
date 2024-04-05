import express from 'express';

import auth from "../middleware/auth.js";
import { loginSuperAdmin } from "../controllers/authSA.js";
import { RecentCourses, TotalJobs, TotalTips, coursesCount, recentUnverifiedJobs } from '../controllers/DashboardSA.js';


const router = express.Router();

router.post('/login',loginSuperAdmin)

// get courses count
router.get('/courses-count',coursesCount)
router.get('/tips-count',TotalTips)
router.get('/jobs-count',TotalJobs)
router.get('/recent-unverified-jobs',recentUnverifiedJobs)
router.get('/recent-courses',RecentCourses)



export default router
