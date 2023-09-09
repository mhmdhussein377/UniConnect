const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    user: {
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
        enum: ["friend request", "community join request", "community invite request"]
    },
    content: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

// notificationSchema.index({ user: 1 });

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;