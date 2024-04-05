import Courses from "../models/courses.js";
import Tips from '../models/TipsAdmin.js'; 
import Jobs from '../models/jobs.js';


export const coursesCount = async (req, res) => {
    try{    
        const courses = await Courses.countDocuments();
        // console.log(courses)
        return res.status(200).json({success:true,result:courses})
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}

export const TotalTips = async (req, res) => {
    try{
        const tips = await Tips.countDocuments();
        // console.log(tips)
        return res.status(200).json({success:true,result:tips})
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}

export const TotalJobs = async (req, res) => {
    try{
        const jobs = await Jobs.countDocuments();
        // console.log(jobs)
        return res.status(200).json({success:true,result:jobs})
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}

export const recentUnverifiedJobs = async (req, res) => {
    try{
        const jobs = await Jobs.find({isVerifiedJob:false})
        .populate('recruiter_info')
        .sort({created_at:-1})
        .limit(5);
        // -1 Means descending order
        // console.log(jobs)
        return res.status(200).json({success:true,result:jobs})
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}

export const RecentCourses = async (req, res) => {
    try{
        const courses = await Courses.find().sort({createdAt:-1}).limit(5);
        console.log(courses)
        return res.status(200).json({success:true,result:courses})
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}

