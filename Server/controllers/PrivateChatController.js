const PrivateConversation = require("./../models/PrivateConversation")

const CreatePrivateConversation = async(req, res) => {
    const {userOne, userTwo} = req.body;
    try {
        const conversation = await PrivateConversation.findOne({
            Members: {
                $all: [userOne, userTwo]
            }
        });

        if (!conversation) {
            const newConversation = new PrivateConversation({
                Members: [userOne, userTwo]
            });
            await newConversation.save();
        }

        res
            .status(200)
            .json(conversation);
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

module.exports = {
    CreatePrivateConversation,
    CreatePrivateMessage
}