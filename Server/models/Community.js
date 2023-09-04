const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitSchema = new Schema({
    name: String,
    description: String,
    privancy: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {
    timestamps: true
});

export const Community = mongoose.model("Community", communitySchema);