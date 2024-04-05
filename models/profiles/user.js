import mongoose, { Schema } from "mongoose";

const UserEducationSchema = new Schema({
    school: { type: String, required: true },
    city: { type: String, required: true },
    degree: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    description: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true }
);

const ExperienceSchema = new Schema({
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    department: { type: String, required: true },
    city: { type: String, required: true },
    job_start_date: { type: Date, required: true },
    job_end_date: { type: Date, required: false },
    is_current_job: { type: Boolean, required: false },
    jobExperience: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true }
);

const CertificationSchema = new Schema({
    certificate_name: { type: String, required: true },
    issued_by: { type: String, required: true },
    issue_month: { type: String, required: true },
    issue_year: { type: String, required: true },
    expiration_month: { type: String, required: false },
    expiration_year: { type: String, required: false },
    credential_id: { type: String, required: false },
    credential_url: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}
    , { timestamps: true }
);

const UserProfileSchema = new Schema({
    introduction: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}
, { timestamps: true }
);

const SkillsSchema = new Schema({
    skills: { type: [String], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}
, { timestamps: true }
);

const LanguageSchema = new Schema({
    language: { type: String, required: true },
    proficiency: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}
, { timestamps: true }
)

const AdditionalInfoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}
, { timestamps: true }
)

const CVSchema = new Schema({
    cv_db: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}
, { timestamps: true }
)


export const CV = mongoose.model('CV', CVSchema);
export const AdditionalInfo = mongoose.model('AdditionalInfo', AdditionalInfoSchema);
export const Language = mongoose.model('Language', LanguageSchema);
export const Certificates = mongoose.model('Certificates', CertificationSchema);
export const Skills = mongoose.model('Skills', SkillsSchema);
export const UserEducation = mongoose.model('UserEducation', UserEducationSchema);
export const Experience = mongoose.model('Experience', ExperienceSchema);
export default mongoose.model('UserProfile', UserProfileSchema)