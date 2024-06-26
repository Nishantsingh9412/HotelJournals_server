import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    userType: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    country_code: { type: String, required: true },
    phone: { type: String, required: true },
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    dob: { type: String, required: false },
    location: { type: String, required: false },
    joinedOn: { type: Date, default: Date.now }
}
    , { timestamps: true }
);

export default mongoose.model('User', userSchema);