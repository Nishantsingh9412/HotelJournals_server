import express from "express"

import {
    AllCourseData,
    CoursesAdmin,
    DeleteCourse, 
    SingleCourseData,
    editCourse,
    AllCompaniesName,
    courseSearch,
    AllCourseFilters,
    paginatedCourses,
    similarCourses,
    educatorCourses
} from "../controllers/courses.js"

const router = express.Router();

// Similar Courses
router.get('/similarCourses/:id',similarCourses)

// Course Posted by educator
router.get('/educatorCourses/:id',educatorCourses)

// Paginate Courses
router.get('/paginateCourses', paginatedCourses)
// Filter Courses 
router.get('/courseFilter', AllCourseFilters)
// Search courses 
router.get('/courseSearch', courseSearch)
// Get all Companies name (Course Created by)
router.get('/allCompanies', AllCompaniesName)
// Add a new Course
router.post('/newCourse', CoursesAdmin)
// Get all Courses
router.get('/allCourses', AllCourseData)
// Get a single Course
router.get('/singleCourse/:id', SingleCourseData)
// Delete a single Course
router.delete('/singleCourse/:id', DeleteCourse)
// Edit a single Course
router.patch('/singleCourse/:id', editCourse)

export default router;