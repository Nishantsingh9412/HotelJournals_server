import mongoose, { mongo } from "mongoose";

const tipsAdminSchema = mongoose.Schema({
    title: { type: String, require: true },
    shortDescription: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true }

}
    , { timestamps: true }
)

export default mongoose.model('Tips', tipsAdminSchema);