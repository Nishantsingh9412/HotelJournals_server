
import mongoose from "mongoose";
import RecruiterProfile from "../models/profiles/recruiter.js";
import Jobs from '../models/jobs.js'
import User from "../models/auth.js";

// Jobs According to status
// Hired Candidates for a particular job
// export const hiredCandParticularJob = async (req, res) => {
//     try {
//         const { id: jobId } = req.params;
//         if (!mongoose.Types.ObjectId.isValid(jobId)) {
//             return res.status(400).json({ success: false, message: 'Invalid ID' })
//         }
//         const job = await Jobs.findById(jobId).populate('applicants.user', '-password -joinedOn');
//         if (!job) {
//             return res.status(400).json({ success: false, message: 'No Job Found' });
//         } else {
//             const hiredCandidates = job.applicants.filter(applicant => applicant.status === 'Hired');
//             if(hiredCandidates.length === 0){
//                 return res.status(400).json({ success: false, message: 'No Hired Candidates Found' });
//             }else{
//                 res.status(200).json({ success: true, message: 'Hired Candidates Fetched Successfully', result: hiredCandidates });
//             }
//         }
//     } catch (error) {
//         console.log("Error from hiredCandidatesParticularJob Controller ", error.message)
//         res.status(500).json({ success: false, message: error.message });
//     }
// }
// Rejected Candidates for a particular job
// export const rejCandParticularJob = async (req, res) => {
//     try {
//         const { id: jobId } = req.params;
//         if (!mongoose.Types.ObjectId.isValid(jobId)) {
//             return res.status(400).json({ success: false, message: 'Invalid ID' })
//         }
//         const job = await Jobs.findById(jobId).populate('applicants.user', '-password -joinedOn');
//         if (!job) {
//             return res.status(400).json({ success: false, message: 'No Job Found' });
//         } else {
//             const rejectedCandidates = job.applicants.filter(applicant => applicant.status === 'Rejected');
//             if(rejectedCandidates.length === 0){
//                 return res.status(400).json({ success: false, message: 'No Rejected Candidates Found' });
//             }else{
//                 res.status(200).json({ success: true, message: 'Rejected Candidates Fetched Successfully', result: rejectedCandidates });
//             }
//         }
//     } catch (error) {
//         console.log("Error from rejectedCandidatesParticularJob Controller ", error.message)
//         res.status(500).json({ success: false, message: error.message });
//     }
// }
// Offered Candidates for a particular job
// export const offeredCandParticularJob = async (req, res) => {
//     try {
//         const { id: jobId } = req.params;
//         if (!mongoose.Types.ObjectId.isValid(jobId)) {
//             return res.status(400).json({ success: false, message: 'Invalid ID' })
//         }
//         const job = await Jobs.findById(jobId).populate('applicants.user', '-password -joinedOn');
//         if(!job){
//             return res.status(400).json({ success: false, message: 'No Job Found' });
//         }else{
//             const offeredCandidates = job.applicants.filter(applicant => applicant.status === 'Offered');
//             if(offeredCandidates.length === 0){
//                 return res.status(400).json({ success: false, message: 'No Offered Candidates Found' });
//             }else{
//                 res.status(200).json({ success: true, message: 'Offered Candidates Fetched Successfully', result: offeredCandidates });
//             }
//         }
//     } catch (error) {
//         console.log("Error from offeredCandidatesParticularJob Controller ", error.message)
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

// Not Offered Candidates for a particular job
// export const notOfferedCandPartJob = async (req, res) => {
//     try {
//         const { id: jobId } = req.params;
//         if (!mongoose.Types.ObjectId.isValid(jobId)) {
//             return res.status(400).json({ success: false, message: 'Invalid ID' })
//         }
//         const job = await Jobs.findById(jobId).populate('applicants.user', '-password -joinedOn');
//         if(!job){
//             return res.status(400).json({ success: false, message: 'No Job Found' });
//         }else{
//             const notOfferedCandidates = job.applicants.filter(applicant => applicant.status === 'Not_Offered');
//             if(notOfferedCandidates.length === 0){
//                 return res.status(400).json({ success: false, message: 'No Not Offered Candidates Found' });
//             }else{
//                 res.status(200).json({ success: true, message: 'Not Offered Candidates Fetched Successfully', result: notOfferedCandidates });
//             }
//         }
//     } catch (error) {
//         console.log("Error from notOfferedCandPartJob Controller ", error.message)
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

export const checkAppliedByUser = async (req, res) => {
    const {id:_id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' })
    }
    try{
        const allAppliedJobs = await Jobs.find({ "applicants.user": _id }).populate('recruiter_info');
        if(allAppliedJobs.length === 0){
            return res.status(400).json({ success: false, message: 'No Job Found' });
        }
        res.status(200).json({ success: true, message: 'Applied Jobs Fetched Successfully', result: allAppliedJobs });
    }catch(err){
        console.log("Error from checkAppliedByUser Controller ", err.message)
        res.status(500).json({ success: false, message: err.message });
    }
}

export const checkAppliedSingle = async (req, res) => {
    const { jobid, userid } = req.params;
    const job = await Jobs.findById(jobid);
    if (!job) {
        return res.status(400).json({ success: false, message: 'No Job Found' });
    }
    const userAppliedOrNot = await Jobs.findOne({ _id: jobid, "applicants.user": userid });
    if (userAppliedOrNot) {
        return res.status(200).json({
            success: true,
            message: 'User Applied for this Job',
            applied: true,
        });
    } else {
        return res.status(200).json({
            success: true,
            message: 'User Not Applied for this Job',
            applied: false,
        });
    }
}

export const getSimilarJobs = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' })
    }
    try {
        const job = await Jobs.findById(_id).populate('recruiter_info')
        // console.log(job);
        // Find similar jobs based on category and skills
        let similarJobs = await Jobs.find({
            _id: { $ne: _id },
            isVerifiedJob: true,
            jobTitle: job.jobTitle,
            // jobCategory: job.jobCategory,
            mandatorySkills: { $in: job.mandatorySkills }
        }).populate('recruiter_info').limit(5);

        if (similarJobs.length < 5) {
            const additionalJobs = await Jobs.aggregate([{ $sample: { size: 5 - similarJobs.length } }]);
            const populatedAdditionalJobs = await Jobs.populate(additionalJobs, { path: 'recruiter_info' });
            similarJobs = similarJobs.concat(populatedAdditionalJobs);
        }

        console.log("this is similar jobs : \n");
        console.log(similarJobs);

        // res.json(similarJobs);
        res.status(200).json({ success: true, message: 'Similar Jobs Fetched Successfully', result: similarJobs })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

// All Jobs Verified Lazy Loading 
export const getAllJobsLazyLoading = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        const totalJobs = await Jobs.countDocuments({ isVerifiedJob: true });
        const jobs = await Jobs.find({ isVerifiedJob: true }).populate('recruiter_info').skip(startIndex).limit(limit);

        const results = {
            totalJobs,
            pageCount: Math.ceil(totalJobs / limit),
            paginatedData: jobs,
        };

        if (page < results.pageCount) {
            results.next = {
                page: page + 1,
            };
        }

        if (page > 1) {
            results.prev = {
                page: page - 1,
            };
        }
        res.status(200).json({ success: true, message: 'Paginated jobs', result: results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
// Verify Job by SuperAdmin 
export const VerifyJobs = async (req, res) => {
    const { id: jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' })
    }
    try {
        let verifiedJobStatus = await Jobs.findOneAndUpdate(
            { _id: jobId },
            {
                $set: {
                    'isVerifiedJob': true
                }
            }, { new: true });
        if (!verifiedJobStatus) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        } else {
            res.status(200).json({ success: true, message: 'Job Verified SuccessFully', result: verifiedJobStatus });
        }
    } catch (error) {
        console.log("Error from updateCandidateStatus Controller ", error.message)
        res.status(500).json({ success: false, message: error.message });
    }
}

// Reject Job by SuperAdmin
export const rejectJobs = async (req, res) => {
    const { id: jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' })
    }
    try {
        let rejectedJobStatus = await Jobs.findOneAndUpdate(
            { _id: jobId },
            {
                $set: {
                    'isVerifiedJob': false
                }
            }, { new: true });

        if (!rejectedJobStatus) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        } else {
            res.status(200).json({ success: true, message: 'Job Rejected SuccessFully', result: rejectedJobStatus });
        }
    } catch (error) {
        console.log("Error from updateCandidateStatus Controller ", error.message)
        res.status(500).json({ success: false, message: error.message });
    }

}
// Filter Section jobs

export const filterJobs = async (req, res) => {
    try {
        const {
            DatePosted,
            ContractTypes,
            JobType,
        } = req.query;

        console.log("DatePosted", DatePosted);
        console.log("ContractTypes", ContractTypes);
        console.log("JobType", JobType);

        // Build the filter object
        const filter = {};

        if (DatePosted && DatePosted !== "All" && DatePosted !== "24") {
            const daysAgo = new Date();
            daysAgo.setDate(daysAgo.getDate() - Number(DatePosted));
            filter.created_at = { $gte: daysAgo };
        }

        if (DatePosted === "24") {
            const hoursAgo = new Date();
            console.log("hoursAgo : ", hoursAgo);
            hoursAgo.setHours(hoursAgo.getHours() - 24);
            console.log("hoursAgo GetHours : ", hoursAgo.getHours() - 24);
            filter.created_at = { $gte: hoursAgo };
        }

        if (DatePosted === "10") {
            const minutesAgo = new Date();
            minutesAgo.setMinutes(minutesAgo.getMinutes() - 10);
            filter.created_at = { $gte: minutesAgo };
        }

        if (DatePosted === "All") {
            filter.created_at = { $gte: new Date(0) };
        }

        if (ContractTypes) {
            filter.jobCategory = { $in: ContractTypes.split(',') };
        }

        if (JobType) {
            filter.jobType = { $in: JobType.split(',') };
        }
        // Find the jobs that match the filter criteria
        const jobsFinded = await Jobs.find({ ...filter, isVerifiedJob: true }).populate('recruiter_info');

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        const totalJobs = jobsFinded.length;
        const jobs = jobsFinded.slice(startIndex, startIndex + limit);

        const results = {
            totalJobs,
            pageCount: Math.ceil(totalJobs / limit),
            paginatedData: jobs,
        };

        if (page < results.pageCount) {
            results.next = {
                page: page + 1,
            };
        }
        if (page > 1) {
            results.prev = {
                page: page - 1,
            };
        }
        // Send the filtered jobs as the response
        res.status(200).json({
            success: true,
            message: 'Jobs Filtered Successfully',
            result: results
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// Update candidate status for a job Offered, Hired, Rejected
export const updateCandidateStatus = async (req, res) => {
    const { jobId, userId, status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(jobId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' })
    }
    try {
        let applicantStatus = await Jobs.findOneAndUpdate(
            { _id: jobId, "applicants.user": userId },
            {
                $set: {
                    "applicants.$.status": status
                }
            },
            { new: true, runValidators: true }
        );
        if (!applicantStatus) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        applicantStatus = await Jobs.populate(applicantStatus, { path: 'applicants.user' });
        res.status(200).json({ success: true, message: 'Candidate status updated successfully', result: applicantStatus });
    } catch (error) {
        console.log("Error from updateCandidateStatus Controller ", error.message)
        res.status(500).json({ success: false, message: error.message });
    }
}
// Apply for a job
export const applyJob = async (req, res) => {
    const { jobId, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(jobId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: ' Invalid ID"s ' })
    }

    const alreadyAppliedToJob = await Jobs.findOne({ _id: jobId, "applicants.user": userId });
    if (alreadyAppliedToJob) {
        return res.status(400).json({ success: false, message: 'already applied to job' })
    }
    try {
        let jobApplicants = await Jobs.findOneAndUpdate(
            { _id: jobId },
            {
                $addToSet:
                    { applicants: { user: userId, status: 'Not_Offered' } }
            },
            { new: true }
        );

        if (!jobApplicants) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }


        // Manually populate the updated document
        jobApplicants = await Jobs.populate(jobApplicants, { path: 'applicants.user' });

        res.status(200).json({ success: true, message: 'Applied for Job Successfully', result: jobApplicants });
    } catch (error) {
        console.log("Error from applyJob Controller ", error.message)
        res.status(500).json({ success: false, message: error.message });
    }
}
// Post a new job
export const postJobs = async (req, res) => {
    try {
        const {
            job_title, job_category, job_type,
            job_location, mandatory_skills, optional_skills,
            joining_date, is_immediate, work_experience_min,
            work_experience_max, salary_specification, salary_start,
            salary_end, no_of_openings,
            job_description, isExternal, job_link, created_by, recruiter_info
        } = req.body;

        if (
            !job_title ||
            !job_category ||
            !job_type ||
            job_location.length === 0 ||
            mandatory_skills.length === 0 ||
            (is_immediate === false && !joining_date) ||
            !work_experience_min ||
            !work_experience_max ||
            !salary_start ||
            !salary_end ||
            !salary_specification ||
            !no_of_openings ||
            !job_description
        ) {
            return res.status(400).json({ success: false, message: "Please Fill all the fieldsssss" });
        }
        else {
            // const recruiterCompanyLogo = await RecruiterProfile.findOne({ created_by: created_by }).select('company_logo');
            // const recruiterCompanyName = await RecruiterProfile.findOne({ created_by: created_by }).select('companyName');
            // if (!recruiterCompanyLogo) {
            //     console.log("No Company Logo Found")
            // }
            // if (!recruiterCompanyName) {
            //     console.log("No Company Name Found")
            // }
            const newJob = await Jobs.create({
                jobTitle: job_title,
                jobCategory: job_category,
                jobType: job_type,
                jobLocation: job_location,
                mandatorySkills: mandatory_skills,
                optionalSkills: optional_skills,
                joiningDate: joining_date,
                isImmediate: is_immediate,
                workExperienceMin: work_experience_min,
                workExperienceMax: work_experience_max,
                salarySpecification: salary_specification,
                salaryStart: salary_start,
                salaryEnd: salary_end,
                no_of_openings,
                jobDescription: job_description,
                isExternal,
                jobLink: job_link,
                // company_name: recruiterCompanyName.companyName,
                // company_logo: recruiterCompanyLogo ? recruiterCompanyLogo.company_logo : undefined,
                created_by,
                recruiter_info,
            });
            if (newJob) {
                const populatedJob = await Jobs.findById(newJob._id).populate('recruiter_info');
                res.status(201).json({ success: true, message: 'Job Added Successfully', result: populatedJob })
            } else {
                res.status(400).json({ success: false, message: 'failed to create user' })
            }
        }
    } catch (error) {
        console.log("Error from postJobs Controller ", error.message)
        res.status(500).json({ success: false, message: 'something went wrong' })
    }
}

// Get all Jobs (Verified Only)
export const getAllJobs = async (req, res) => {
    try {
        const AllJobs = await Jobs.find({ isVerifiedJob: true }).populate('recruiter_info');
        const AllJobsArray = [];
        AllJobs.forEach(singleJob => {
            AllJobsArray.push({
                _id: singleJob._id,
                jobTitle: singleJob.jobTitle,
                jobCategory: singleJob.jobCategory,
                jobType: singleJob.jobType,
                jobApplicants: singleJob.applicants,
                jobLocation: singleJob.jobLocation,
                mandatorySkills: singleJob.mandatorySkills,
                optionalSkills: singleJob.optionalSkills,
                joiningDate: singleJob.joiningDate,
                isImmediate: singleJob.isImmediate,
                workExperienceMin: singleJob.workExperienceMin,
                workExperienceMax: singleJob.workExperienceMax,
                salarySpecification: singleJob.salarySpecification,
                salaryStart: singleJob.salaryStart,
                salaryEnd: singleJob.salaryEnd,
                no_of_openings: singleJob.no_of_openings,
                jobDescription: singleJob.jobDescription,
                isExternal: singleJob.isExternal,
                jobLink: singleJob.jobLink,
                company_logo: singleJob.company_logo,
                company_name: singleJob.company_name,
                created_by: singleJob.created_by,
                recruiter_info: singleJob.recruiter_info
            })
        });
        res.status(200).json({ success: true, message: 'All jobs Data Fetched Successfully', result: AllJobsArray })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
// get all jobs for recruiter (filter by id)
export const getAllJobsRecruiter = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID' })
        }
        const AllJobsRecruiter = await Jobs.find({ created_by: _id }).populate('recruiter_info');
        res.status(200).json({ success: true, message: 'All jobs Data Fetched Successfully', result: AllJobsRecruiter })
    } catch (error) {
        console.log("Error from getAllJobsRecruiter Controller ", error.message)
        res.status(500).json({ success: false, message: 'something went wrong' })
    }
}

// Get all Jobs (Both Verified and unverified)
export const getAllJobsForSuperAdmin = async (req, res) => {
    try {
        const AllJobs = await Jobs.find().populate('created_by', 'email').populate('recruiter_info');
        const AllJobsArray = [];
        AllJobs.forEach(singleJob => {
            AllJobsArray.push({
                _id: singleJob._id,
                jobTitle: singleJob.jobTitle,
                jobCategory: singleJob.jobCategory,
                jobType: singleJob.jobType,
                jobApplicants: singleJob.applicants,
                jobLocation: singleJob.jobLocation,
                mandatorySkills: singleJob.mandatorySkills,
                optionalSkills: singleJob.optionalSkills,
                joiningDate: singleJob.joiningDate,
                isImmediate: singleJob.isImmediate,
                workExperienceMin: singleJob.workExperienceMin,
                workExperienceMax: singleJob.workExperienceMax,
                salarySpecification: singleJob.salarySpecification,
                salaryStart: singleJob.salaryStart,
                salaryEnd: singleJob.salaryEnd,
                no_of_openings: singleJob.no_of_openings,
                jobDescription: singleJob.jobDescription,
                isExternal: singleJob.isExternal,
                isVerifiedJob: singleJob.isVerifiedJob,
                jobLink: singleJob.jobLink,
                company_logo: singleJob.company_logo,
                company_name: singleJob.company_name,
                created_by: singleJob.created_by,
                recruiter_info: singleJob.recruiter_info
            })
        });
        res.status(200).json({ success: true, message: 'All jobs Data Fetched Successfully', result: AllJobsArray })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getSingleJob = async (req, res) => {
    try {
        const { id } = req.params;
        const singleJob = await Jobs.findById(id).populate('applicants.user', '-password -joinedOn').populate('recruiter_info');
        res.status(200).json({ success: true, message: 'Single Job Data', result: singleJob })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export const DeleteJob = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'no job exists' })
    }
    try {
        await Jobs.findByIdAndDelete(_id);
        res.status(200).json({ success: true, message: 'job deleted successfully' })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export const editJob = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send({ success: false, message: 'Invalid job ID' });
    }
    const {
        job_title, job_category, job_type,
        job_location, mandatory_skills, optional_skills,
        joining_date, is_immediate, work_experience_min,
        work_experience_max, salary_specification, salary_start,
        salary_end, no_of_openings,
        job_description, isExternal, job_link
    } = req.body;

    console.log('after console log of req.body in editJob Controller');
    try {
        const updatedJob = await Jobs.findByIdAndUpdate(_id, {
            $set: {
                'jobTitle': job_title,
                'jobCategory': job_category,
                'jobType': job_type,
                'jobLocation': job_location,
                'mandatorySkills': mandatory_skills,
                'optionalSkills': optional_skills,
                'joiningDate': joining_date,
                'isImmediate': is_immediate,
                'workExperienceMin': work_experience_min,
                'workExperienceMax': work_experience_max,
                'salarySpecification': salary_specification,
                'salaryStart': salary_start,
                'salaryEnd': salary_end,
                'no_of_openings': no_of_openings,
                'jobDescription': job_description,
                'isExternal': isExternal,
                'jobLink': job_link
            },
        }, { new: true })

        console.log(updatedJob);

        if (!updatedJob) {
            return res.status(400).json({ success: false, message: 'Failed to update job' })
        } else {
            res.status(200).json({ success: true, message: ' Job Updated Successfully ', result: updatedJob })
        }
    } catch (error) {
        console.log("Error from editJob Controller ", error.message)
        res.status(500).json({ success: false, message: error.message })
    }
}