const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    username: {
        type: String,
        required: [
            true, "Name is required"
        ],
        unique: [true, "Username has already been taken"]
    },
    email: {
        type: String,
        required: [
            true, "Email is required"
        ],
        unique: [true, "Account already exists! Login instead"]
    },
    password: {
        type: String,
        required: true,
        min: [8, "Password must be at least 8 characters"]
    },
    online: Boolean,
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    profile: {
        profilePicture: String,
        coverPicture: String,
        nickname: String,
        major: String,
        university: String,
        location: String,
        bio: String,
        skills: [String],
        languages: [String]
    },
    joinedCommunities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community"
        }
    ],
    createdCommunities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community"
        }
    ]
});

const User = mongoose.model("User", userSchema);
module.exports = User;