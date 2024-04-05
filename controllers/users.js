import mongoose from 'mongoose';
import users from '../models/auth.js'


export const getProfile = async (req, res) => {
    try {
        const allUsers = await users.find();
        const allUserDetails = [];
        allUsers.forEach(singleUser => {
            allUserDetails.push({
                _id: singleUser._id, fname: singleUser.fname,
                lname: singleUser.lname,
                email: singleUser.email,
                userType: singleUser.userType,
                phone: singleUser.phone,
                country_code: singleUser.country_code,
                joinedOn: singleUser.joinedOn
            });
        });
        res.status(200).json({ success: true, allUserDetails });
    } catch (error) {
        res.status(500).json({ success: false, message: `Something went wrong from getProfile controller ${error.message}` });
    }
}

export const getProfileById = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).json({ success: false, message: 'Invalid Id' });
    try {
        const singleUser = await users.findById(_id);
        res.status(200).json({ success: true, result: singleUser })
    } catch (error) {
        res.status(500).json({ success: false, message: `Something went wrong` });
    }
}

// EditProfile Auth
export const editProfile = async (req, res) => {
    const { id: _id } = req.params;
    let { fname, lname, dob, location } = req.body;

    // Convert dob to ISO format (YYYY-MM-DD)
    // const [day, month, year] = dob.split("/");
    // const [day, month, year] = dob.split("-");
    // dob = new Date(year, month - 1, day);
    try {
        const existingUser = await users.findByIdAndUpdate(_id,
            { fname, lname, dob, location },
            { new: true }
        );
        // console.log("Existing User: ", existingUser);
        if(!existingUser){
            return res.status(400).json({ success: false, message: `Failed to update User ` });
        }else{
            return res.status(200).json({ success: true, result: existingUser });
        }
    } catch (err) {
        console.log("Error from edit profile controller: ", err.message);
        return res.status(500).json({ success: false, message: `Something went wrong from editProfile controller ${err.message}` });
    }
}


// DeleteProfile Auth
export const deleteProfile = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const existingUser = await users.findByIdAndRemove(_id);
        return res.status(200).json({ success: true, result: existingUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Something went wrong` });
    }
}


// For pic 
export const getProfilePic = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).json({ success: false, message: 'Invalid Id' });
    try {
        const singleUser = await users.findById(_id);
        res.status(200).json({ success: true, result: singleUser.pic })
    } catch (error) {
        res.status(500).json({ success: false, message: `Something went wrong` });
    }

}

export const updateProfilePic = async (req, res) => {
    const { id: _id } = req.params;
    const { pic } = req.body;
    if (!pic) {
        return res.status(400).json({ success: false, message: 'Please select a picture' })
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Invalid Id' });
    }

    try {
        const updatedProfilePic = await users.findByIdAndUpdate(_id, {
            $set: {
                'pic': pic
            }
        }, { new: true });

        if (!updatedProfilePic) {
            return res.status(400).json({ success: false, message: 'Failed to update picture' })
        } else {
            res.status(200).json({ success: true, message: 'Picture Updated Successfulllllllly', result: updatedProfilePic })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Something went wrong` });
    }
}


// It's actually updating with that of default image, but not deleting it
export const delteProfilePic = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Invalid Id' });
    }

    try {
        const deleteProfilePic = await users.findByIdAndUpdate(_id, {
            $set: {
                'pic': 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
            }
        }, { new: true });

        if (!deleteProfilePic) {
            return res.status(400).json({ success: false, message: 'Failed to delete picture' })
        } else {
            res.status(200).json({ success: true, message: 'Picture deleted Successfuly', result: deleteProfilePic })
        }
    } catch (error) {
        console.log("Error from delete profile pic controller: ", error.message);
        res.status(500).json({ success: false, message: `Something went wrong` });
    }
}

