import mongoose, { Schema } from "mongoose";

const jobsSchema = new Schema({
    jobTitle: { type: String, required: true },
    jobCategory: { type: String, required: true },  //Intern , full time , contract
    jobType: { type: String, required: true }, // Remote , inOffice , Hybrid
    jobLocation: { type: [String], required: true },
    mandatorySkills: { type: [String], required: true },
    optionalSkills: { type: [String], required: false },
    joiningDate: { type: Date, required: true },
    isImmediate: { type: Boolean, required: false },
    workExperienceMin: { type: Number, required: true },
    workExperienceMax: { type: Number, required: true },
    salarySpecification: { type: String, required: true },      // Euro , Dollars , INR // currency 
    salaryStart: { type: Number, required: true },
    salaryEnd: { type: Number, required: true },
    no_of_openings: { type: Number, required: true },
    extraBenifits: { type: [String], required: false },
    jobDescription: { type: String, required: true },
    isExternal: { type: Boolean, required: true },
    isVerifiedJob: { type: Boolean, required: false, default: false },
    jobLink: { type: String, required: false },
    applicants: {
        type: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            status: {
                type: String,
                enum: ['Not_Offered', 'Offered', 'Hired', 'Rejected'],
                default: 'Not_Offered'
            }
        }],
        required: false,
    },
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recruiter_info: { type: Schema.Types.ObjectId, ref: 'RecruiterProfile', required: true },
    company_name: { type: String, required: false },
    company_logo: {
        // type: Schema.Types.ObjectId, 
        // ref:'RecruiterProfile',
        type: String,
        default: 'https://res.cloudinary.com/dwahql1jy/image/upload/v1709029875/Designer_1_moynhz.png'
    },
    created_at: { type: Date, default: Date.now },
}
    , { timestamps: true }
)

export default mongoose.model('Jobs', jobsSchema)