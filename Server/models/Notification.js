const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    },
    type: {
        type: String,
        required: true,
        enum: [
            "friend request",
            "friend request accepted",
            "community join request",
            "community join accepted",
            "community invite request",
            "community invite accepted",
        ]
    },
    content: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: [
            "pending", "accepted", "rejected"
        ],
        default: "pending"
    }
}, {timestamps: true});

// notificationSchema.index({ user: 1 });

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;