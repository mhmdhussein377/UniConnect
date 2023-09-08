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
        if (!user) 
            return res.status(404).json({error: "Creator not found"})

        const community = new Community({name, description, privacy, creator})
        const savedCommunity = await community.save()

        user
            .createdCommunities
            .push(savedCommunity._id)
        await user.save()

        return res
            .status(201)
            .json(savedCommunity)
    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal server error"});
    }
}

const DeleteCommunity = async(req, res) => {
    const {communityId} = req.params
    const userId = req.user.id

    try {
        const community = await Community.findById(communityId)
        if (!community) 
            return res.status(404).json({error: "Community not found"})

        if (community.creator.toString() !== userId) 
            return res.stauts(403).json({error: "Permission denied"})

        const creator = await User.findById(community.creator)
        if (creator) {
            creator.createdCommunities = creator
                .createdCommunities
                .filter(community => community.id !== communityId)
            await creator.save()
        }

        await User.updateMany({
            joinedCommunities: communityId
        }, {
            $pull: {
                joinedCommunities: communityId
            }
        })

        await Community.findByIdAndDelete(communityId)

        return res
            .status(204)
            .json("Community deleted successfully");
    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal server error"});
    }
}

const UpdateCommunity = async(req, res) => {
    const {communityId} = req.params
    const {name, description, privacy} = req.body

    try {
        const community = await Community.findById(communityId)

        if (!community) 
            return res.status(404).json({error: "Community not found"})

        if (community.creator.toString() !== req.user.id) {
            return res
                .status(403)
                .json({error: "Permission denied. You are not the creator of this community"});
        }

        if (name) 
            community.name = name
        if (description) 
            community.description = description
        if (privacy) 
            community.privacy = privacy

        res
            .stauts(200)
            .json({message: "Community updated successfully", community})
    } catch (error) {
        res
            .status(500)
            .json({error: "Internal Server Error"});
    }
}

const AddMembers = async(req, res) => {
    const {communityId} = req.params
    const { userIds } = req.body;

    try {
        const community = await Community.findById(communityId)

        if (!community) 
            return res.status(404).json({error: "Community not found"})

        if (community.creator.toString() !== req.user.id) 
            return res.status(403).json({error: "Permission denied. You are not the creator of this community"});

        const usersToAdd = await User.find({
            _id: {
                $in: userIds
            }
        })

        community.members.push(...usersToAdd.map(user => user._id))
        await community.save()

        return res.status(200).json({message: "Members added to the community successfully", community})
        }
    catch (error) {
        res
            .status(500)
            .json({error: "Internal Server Error"});
    }
}

module.exports = {
    getCommunity,
    CreateCommunity,
    DeleteCommunity,
    UpdateCommunity,
    AddMembers
};