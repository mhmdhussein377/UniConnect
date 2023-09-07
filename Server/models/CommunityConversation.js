const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communityConversationSchema = new Schema({
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        required: true,
    },
    messages: {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: String,
        fileURL: String,
    }
});

const CommunityConversation = mongoose.model("CommunityConversation", communityConversationSchema);
module.exports = CommunityConversation;