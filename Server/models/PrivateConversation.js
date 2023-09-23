const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: String,
    fileURL: String,
    timestamps: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false,
    },
})

const PrivateConversationSchema = new Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [MessageSchema],
}, {timestamps: true});

const PrivateConversation = mongoose.model('PrivateConversation', PrivateConversationSchema)
module.exports = PrivateConversation