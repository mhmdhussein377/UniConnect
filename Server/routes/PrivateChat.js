const express = require("express");
const router = express.Router();
const PrivateConversation = require("../models/PrivateConversation");

router.post("/newPrivateMessage", async(req, res) => {
    const {sender, receiver, content} = req.body;

    try {
        const existingPrivateConversation = await PrivateConversation.findOneAndUpdate({
            Members: {
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

        res
            .status(200)
            .json("message saved successfully");
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

router.post("/readPrivateMessage", async(req, res) => {
    const {userOne, userTwo} = req.body;

    try {
        const data = await PrivateConversation.findOneAndUpdate({
            Members: {
                $in: [userOne, userTwo]
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
});

router.post("/newPrivateConversation", async(req, res) => {
    const {userOne, userTwo} = req.body;
    try {
        const conversation = await PrivateConversation
            .findOne({
            Members: {
                $all: [userOne, userTwo]
            }
        })
            .populate({path: "messages.sender", model: "User"})
            .populate({path: "Members", model: "User"});

        if (!conversation) {
            const newConversation = new PrivateConversation({
                Members: [userOne, userTwo]
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
});

router.post("/privateConversationsMessages", async(req, res) => {
    const {userOne, userTwo} = req.body;

    try {
        const newConversation = await PrivateConversation
            .find({
            Members: {
                $all: [userOne, userTwo]
            }
        })
            .populate({path: "messages.sender", model: "User"})
            .populate({path: "Members", model: "User"});
        res
            .status(200)
            .json(newConversation[0].messages);
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

router.get("/privateConversationsDetails", async(req, res) => {
    try {
        const conversations = await PrivateConversation
            .find({
            Members: {
                $in: [req.user.id]
            }
        })
            .populate({path: "messages.sender", model: "User"})
            .populate({path: "Members", model: "User"});

        // if (!conversations || conversations.length === 0) {
        //     return res
        //         .status(404)
        //         .json({message: "Conversations not found"});
        // }

        const details = conversations.map((item) => {
            const conversationDetails = {
                member: null,
                lastMessage: null,
                unreadMessages: 0
            };

            item
                .Members
                .forEach((member) => {
                    if (member._id.toString() !== req.user.id) {
                        conversationDetails.member = member;
                    }
                });

            if (item.messages.length > 0) {
                const lastMessage = item.messages[item.messages.length - 1];
                conversationDetails.lastMessage = lastMessage.content;

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
});

module.exports = router;
