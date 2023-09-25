const PrivateConversation = require("./../models/PrivateConversation")

const CreatePrivateConversation = async(req, res) => {
    const {userOne, userTwo} = req.body;
    try {
        const conversation = await PrivateConversation
            .findOne({
            members: {
                $all: [userOne, userTwo]
            }
        })
            .populate({path: "messages.sender", model: "User"})
            .populate({path: "members", model: "User"});

        if (!conversation) {
            const newConversation = new PrivateConversation({
                members: [userOne, userTwo]
            });
            newConversation.save();

            res
                .status(200)
                .json(newConversation);
        }
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
};

const CreatePrivateMessage = async(req, res) => {
    const {sender, receiver, content} = req.body

    try {
        await PrivateConversation.findOneAndUpdate({
            members: {
                $all: [sender, receiver]
            }
        }, {
            $push: {
                messages: {
                    sender,
                    content
                }
            }
        });

        if (!PrivateConversation) 
            return res.status(404).json({error: "Private conversation not found"})

        res
            .status(200)
            .json("Message saved successfully")
    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal server error"});
    }
}

const ReadPrivateMessage = async(req, res) => {
    const {userOne, userTwo} = req.body;

    try {
        const data = await PrivateConversation.findOneAndUpdate({
            members: {
                $all: [userOne, userTwo]
            }
        }, {
            $set: {
                "messages.$[].isRead": true
            }
        });

        res
            .status(200)
            .json("message updated successfully");
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
};

const GetPrivateConversationMessages = async(req, res) => {
    const {userOne, userTwo} = req.body;

    try {
        const conversation = await PrivateConversation
            .find({
            members: {
                $all: [userOne, userTwo]
            }
        })
            .populate({path: "messages.sender", model: "User"})
            .populate({path: "members", model: "User"});
        res
            .status(200)
            .json(conversation[0].messages);
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
};

const GetPrivateConversationsDetails = async(req, res) => {
    try {
        const conversations = await PrivateConversation
            .find({
            members: {
                $in: [req.user.id]
            }
        })
            .populate({path: "messages.sender", model: "User"})
            .populate({path: "members", model: "User"});

        const details = conversations.map((item) => {
            const conversationDetails = {
                member: null,
                lastMessage: null,
                unreadMessages: 0,
                _id: item._id
            };

            item
                .members
                .forEach((member) => {
                    if (member._id.toString() !== req.user.id) {
                        conversationDetails.member = member;
                    }
                });

            if (item.messages.length > 0) {
                const lastMessage = item.messages[item.messages.length - 1];
                conversationDetails.lastMessage = {
                    content: lastMessage.content,
                    createdAt: lastMessage.timestamps
                };

                item
                    .messages
                    .forEach((message) => {
                        if (!message.isRead && message.sender !== req.user.id) {
                            conversationDetails.unreadMessages += 1;
                        }
                    });
            }

            return conversationDetails;
        });

        res
            .status(200)
            .json(details);
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
};

module.exports = {
    CreatePrivateConversation,
    CreatePrivateMessage,
    ReadPrivateMessage,
    GetPrivateConversationMessages,
    GetPrivateConversationsDetails
}