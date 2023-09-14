const express = require("express");
const router = express.Router();
const PrivateConversation = require("../models/PrivateConversation");

router.post("/newPrivateMessage", async(req, res) => {
    const {sender, receiver, content} = req.body;

    try {
        await PrivateConversation.findOneAndUpdate({
            Members: {
                $in: [sender, receiver]
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



module.exports = router;
