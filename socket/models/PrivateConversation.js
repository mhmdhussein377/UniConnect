const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PrivateConversationSchema = new Schema({
    Members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            content: String,
            fileURL: String,
        }
    ]
}, {timestamps: true});

const PrivateConversation = mongoose.model('PrivateConversation', PrivateConversationSchema)
module.exports = PrivateConversation