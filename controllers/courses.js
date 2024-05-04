import Courses from "../models/courses.js";
import mongoose from "mongoose";
import user from "../models/profiles/user.js";


export const educatorCourses = async (req, res) => {
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({success:false,message:'Invalid Course Id Provided'});
    }
    try{
        const courses = await Courses.find({created_by:_id});
        if(courses){
            return res.status(200).json({success:true,message:'Courses Fetched',result:courses});
        }else{
            return res.status(400).json({success:false,message:'No Courses Found'});
        }
    }catch(err){
        console.log("Error from educatorCourses Controller",err.message);
    }
}


export const similarCourses = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Invalid Course Id Provided' });
    }
    try {
        const coursefindedByCategory = await Courses.findById(_id).select('course_category');
        const course_category = coursefindedByCategory.course_category;
        const similarCourses = await Courses.find({
            course_category: course_category,
            _id: { $nin: _id }
        }).limit(3);

        if (similarCourses) {
            return res.status(200).json({
                success: true,
                message: 'Similar Courses Fetched',
                result: similarCourses
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No Similar Courses Found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong from server ${error.message}`
        });
    }
}

export const paginatedCourses = async (req, res) => {
    const allCourses = await Courses.find({});
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalCourse = allCourses.length;
    results.pageCount = Math.ceil(allCourses.length / limit);

    if (lastIndex < allCourses.length) {
        results.next = {
            page: page + 1,
        }
    }

    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
        }
    }

    results.pageinatedData = allCourses.slice(startIndex, lastIndex);
    res.status(200).json({ success: true, message: `Paginated-courses`, result: results })
}

export const AllCompaniesName = async (req, res) => {
    try {
        const AllCoursesProviders = await Courses.distinct('company_name');
        res.status(200).json({ success: true, message: 'All Courses Providers Fetched', result: AllCoursesProviders });
    } catch (err) {
        res.status(500).json({ success: false, message: `Something went wrong from server ${error.message}` })
    }
}

export const AllCourseFilters = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const lastIndex = page * limit;
        const results = {};
        const {
            courseTypesFilter,
            courseLangFilter,
            categoriesFilter,
            locationTypeFilter,
            courseValueFilter
        } = req.query;

        // Converting the filter strings back into objects
        const courseTypes = JSON.parse(courseTypesFilter);  // Bachelors , masters , diploma , professional .....
        const courseLanguages = JSON.parse(courseLangFilter);   // English , Spanish , French , German .....
        const categories = JSON.parse(categoriesFilter);    // HR , Pastry  , Oenology , Receptionist .....
        const location = JSON.parse(locationTypeFilter);    // Onsite , offsite
        const courseValue = JSON.parse(courseValueFilter);  // Free , Paid

        // Get the course types, languages, and categories that are set to true
        const selectedCourseTypes = Object.keys(courseTypes).filter(courseType => courseTypes[courseType]);
        const selectedCourseLanguages = Object.keys(courseLanguages).filter(courseLanguage => courseLanguages[courseLanguage]);
        const selectedCategories = Object.keys(categories).filter(category => categories[category]);
        const selectedLocation = Object.keys(location).filter(locationType => location[locationType]);
        const selectedCourseValue = Object.keys(courseValue).filter(courseValues => courseValue[courseValues]);
        console.log("This is the selectedCourseValue", selectedCourseValue)
        console.log("This is sleected course Type", selectedCourseTypes);
        console.log("This is the Selected Location")
        console.log(selectedLocation)

        // Creating a filter object
        let filter = {};

        // Bachelors , masters , diploma , professional .....  

        // if (selectedCourseTypes.length > 0) {
        //     filter.course_type = { $in: selectedCourseTypes};
        // }

        if (selectedCourseTypes.length > 0) {
            filter.course_type = {
                $in: selectedCourseTypes.map(type => new RegExp(type, 'i'))
                // i means case insensitive 
            };
        }

        //  English , Spanish , French , German .....
        if (selectedCourseLanguages.length > 0) {
            if (selectedCourseLanguages.includes('Otros')) {
                filter.languages = {
                    $nin: [
                        /Inglés/i,              //   /i for case-senstivity
                        /Español/i,
                        /Francés/i,
                        /Catalán/i,
                        /Italiano/i,
                        /Portugués/i,
                        /Alemán/i,
                    ]
                };
            } else {
                filter.languages = { $in: selectedCourseLanguages };
            }
        }

        //  HR , Pastry  , Oenology , Receptionist  .....
        if (selectedCategories.length > 0) {
            filter.course_category = { $in: selectedCategories };
        }

        // Onsite , offsite
        if (selectedLocation.length > 0) {
            if (selectedLocation.includes('Online') && selectedLocation.includes('Offline')) {
                filter.format = "Both"
            } else {
                filter.format = { $in: selectedLocation };
            }
        }

        // Free , Paid
        // if(selectedCourseValue.isFree){
        //     filter.isFree = true;
        // }

        // if(selectedCourseValue.isPaid){
        //     filter.isFree = false;
        // }

        if (courseValue.Gratis) {
            filter.isFree = true;
        }

        if (courseValue.Pago) {
            filter.isFree = false;
        }

        // Use the filter object to filter the courses in the database
        const filteredCourses = await Courses.find(filter);
        results.totalCourse = filteredCourses.length;
        results.pageCount = Math.ceil(filteredCourses.length / limit);

        if (lastIndex < filteredCourses.length) {
            results.next = {
                page: page + 1,
            }
        }

        if (startIndex > 0) {
            results.prev = {
                page: page - 1,
            }
        }

        

        results.pageinatedData = filteredCourses.slice(startIndex, lastIndex);
        res.status(200).json({ success: true, message: 'Filtered Courses', result: results });
    } catch (error) {
        console.log("Error from AllCourseFilters Controller", error.message);
        res.status(500).json({ success: false, message: `Something went wrong from server ${error.message}` })
    }
}

export const courseSearch = async (req, res) => {
    try {
        // pagination logic start here
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const lastIndex = page * limit;
        const results = {};
        // some part of pagination end here
        const { courseProvider, keyword } = req.query;
        let filter = {};
        if (courseProvider) {
            filter.company_name = courseProvider;
        }
        if (keyword) {
            filter.title = { $regex: keyword, $options: 'i' };
        }
        const filteredCourses = await Courses.find(filter);
        // pagination logic resumes here 
        results.totalCourse = filteredCourses.length;
        results.pageCount = Math.ceil(filteredCourses.length / limit);

        if(lastIndex < filteredCourses.length){
            results.next = {
                page: page + 1,
            }
        }

        if(startIndex > 0){
            results.prev = {
                page: page - 1,
            }
        }

        results.pageinatedData = filteredCourses.slice(startIndex, lastIndex);
        // pagination logic ends here
        res.status(200).json({ success: true, message: 'Filtered Courses', result: results });
    } catch (error) {
        res.status(500).json({ success: false, message: `Something went wrong from server ${error.message}` })
    }
}

export const CoursesAdmin = async (req, res) => {
    try {
        const { title, description, company_name, price,
            isFree, course_link, format, languages, duration, banner_image, brand_image,
            difficulty, course_category, course_type, created_by } = req.body;

        if (!title || !description || !company_name || !course_link || !format || !languages
            || !duration || !banner_image || !brand_image || !difficulty || !course_type || !course_category) {
            return res.status(400).json({ message: "Please Fill all the fields" })
        } else {
            const newCourse = await Courses.create({
                title, description, company_name, price, isFree, difficulty, course_link,
                format, languages, duration, banner_image,
                brand_image, created_by, course_category, course_type
            });
            res.status(201).json({ success: true, message: "Course Added Successfully", result: newCourse })
        }
    } catch (error) {
        console.log("Error From Courses Admin Controller", error.message);
        res.status(500).json({ success: false, message: `Something went wrong from server ${error.message}` })
    }
}

export const AllCourseData = async (req, res) => {
    try {
        const WholeCourses = await Courses.find();
        const allCoursesArray = [];
        WholeCourses.forEach(singleCourse => {
            allCoursesArray.push({
                _id: singleCourse._id,
                title: singleCourse.title,
                description: singleCourse.description,
                company_name: singleCourse.company_name,
                course_category: singleCourse.course_category,
                course_type: singleCourse.course_type,
                price: singleCourse.price,
                difficulty: singleCourse.difficulty,
                isFree: singleCourse.isFree,
                course_link: singleCourse.course_link,
                format: singleCourse.format,
                languages: singleCourse.languages,
                duration: singleCourse.duration,
                banner_image: singleCourse.banner_image,
                brand_image: singleCourse.brand_image,
                created_by: singleCourse.created_by
            })
        });
        res.status(200).json({ message: 'AllCourses Data Fetched ', result: allCoursesArray })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const SingleCourseData = async (req, res) => {
    try {
        const { id } = req.params;
        const singleCourse = await Courses.findById(id);
        res.status(200).json({ message: 'Single course data ', result: singleCourse })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const DeleteCourse = async (req, res) => {
    const { id: _id } = req.params;   // Renaming id to _id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send('No Post with that id ')
    }
    try {
        await Courses.findByIdAndDelete(_id);
        res.status(204).json({ message: 'Course Deleted Successfully' })
        // status 204 means No Content
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const editCourse = async (req, res) => {
    const { id: _id } = req.params;
    const { title, description, company_name, price,
        isFree, course_link, format, languages, difficulty, duration,
        banner_image, brand_image, course_category, course_type } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send('Invalid Id Provided');
    }

    try {
        const updateCourse = await Courses.findByIdAndUpdate(_id, {
            $set: {
                'title': title, 'description': description, 'company_name': company_name, 'price': price,
                'isFree': isFree, 'course_link': course_link, 'format': format,
                'languages': languages, 'duration': duration, 'difficulty': difficulty,
                'banner_image': banner_image, 'brand_image': brand_image,
                'course_category': course_category, 'course_type': course_type
            },
        }, { new: true })
        res.status(200).json({ message: 'Course Edited Successfully', result: updateCourse });
    } catch (error) {
        res.status(500).json({ message: `Error From editCourse Controller : ${error.message}` });
    }
}



