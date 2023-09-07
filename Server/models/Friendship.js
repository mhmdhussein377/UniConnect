const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendshipSchema = new Schema({
    userOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userTwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: String, // pending, accepted, rejected
});

const Friendship = mongoose.model("Friendship", friendshipSchema);
module.exports = Friendship;