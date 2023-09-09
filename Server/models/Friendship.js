const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusEnum = ["pending", "accepted", "rejected"]

const friendshipSchema = new Schema({
    userOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userTwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: statusEnum,
        default: "pending",
        required: [true, "Status is required"]
    }
});

const Friendship = mongoose.model("Friendship", friendshipSchema);
module.exports = Friendship;