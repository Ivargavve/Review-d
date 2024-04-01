import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        firstname: { type: String},
        lastname: { type: String},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true},
        picturePath: { type: String, default: "" },
        friends: { type: Array, default: [] },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    }, 
    { timestamps: true}
);

const User = mongoose.model('User', userSchema);
export default User;