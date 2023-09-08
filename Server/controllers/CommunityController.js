const Community = require("./../models/Community")
const User = require("./../models/User")

const getCommunity = async(req, res) => {
    const {communityId} = req.params

    try {
        const community = await Community.findById(communityId)

        if (!community) 
            return res.status(404).json({error: "Community not found"})

        return res
            .status(200)
            .json({community})
    } catch (error) {
        res
            .status(500)
            .json({error: "Internal server error"});
    }
}

const CreateCommunity = async(req, res) => {
    const {name, description, privacy} = req.body
    const creator = req.user.id

    try {
        // check if the creator exists
        const user = await User.findById(creator)
        if(!user)
            return res.status(404).json({error: "Creator not found"})

        const community = new Community({name, description, privacy, creator})
        const savedCommunity = await community.save()

        user.createdCommunities.push(savedCommunity._id)
        await user.save()

        return res.status(201).json(savedCommunity)
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const DeleteCommunity = async(req, res) => {}

const UpdateCommunity = async(req, res) => {}

const AddMembers = async(req, res) => {}

module.exports = {
    getCommunity,
    CreateCommunity,
    DeleteCommunity,
    UpdateCommunity,
    AddMembers
};