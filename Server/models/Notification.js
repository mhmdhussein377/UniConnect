const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    isRead: Boolean,
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;