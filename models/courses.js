import mongoose, { Schema } from "mongoose";

const courseSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company_name: { type: String, required: true },
    course_category: { type: String, required: true },
    course_type: { type: String, required: true },
    price: { type: String, required: false },
    isFree: { type: Boolean, default: false, required: true },
    difficulty: { type: String, required: true },
    course_link: { type: String, required: true },
    format: { type: String, required: true },    // Online Offline Both
    languages: { type: [String], required: true },
    duration: { type: String, required: true },
    banner_image: { type: String, required: true },
    brand_image: { type: String, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}
    , { timestamps: true }
);

export default mongoose.model('Courses', courseSchema);