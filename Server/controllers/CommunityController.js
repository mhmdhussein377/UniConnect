const Community = require("./../models/Community")
const User = require("./../models/User")
const Notification = require("./../models/Notification")

const GetCommunity = async(req, res) => {
    const {communityId} = req.params

    try {
        const community = await Community
            .findById(communityId)
            .populate({path: "members", select: "name username _id profile.profileImage"})
            .populate({path: "creator", select: "name username _id profile.profileImage"})

        if (!community) {
            return res
                .status(404)
                .json({message: "Community not found"})
        }

        return res
            .status(200)
            .json({community})
    } catch (error) {
        return res
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
            return res.status(404).json({message: "Creator not found"})

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
        const community = await Community.findById(communityId);
        if (!community) 
            return res.status(404).json({message: "Community not found"})

        if (community.creator.toString() !== userId) 
            return res.status(403).json({message: "Permission denied"})

        const creator = await User.findById(community.creator)
        console.log(creator)
        if (creator) {
            console.log("in creator")
            creator.createdCommunities = creator
                .createdCommunities
                .filter(community => community.toString() !== communityId)
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
            .status(200)
            .json({message: "Community deleted successfully"});
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
            return res.status(404).json({message: "Community not found"})

        if (community.creator.toString() !== req.user.id) {
            return res
                .status(403)
                .json({message: "Permission denied. You are not the creator of this community"});
        }

        if (name) 
            community.name = name
        if (description) 
            community.description = description
        if (privacy) 
            community.privacy = privacy
        await community.save()

        return res
            .status(200)
            .json({message: "Community updated successfully", community})
    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal Server Error"});
    }
}

const AddMembers = async(req, res) => {
    const {communityId} = req.params
    const {userIds} = req.body;

    try {
        const community = await Community.findById(communityId)

        if (!community) 
            return res.status(404).json({message: "Community not found"})

        if (community.creator.toString() !== req.user.id) 
            return res.status(403).json({message: "Permission denied. You are not the creator of this community"});
        
        const usersToAdd = await User.find({
            _id: {
                $in: userIds
            }
        })

        let newMembers = []

        await Promise.all(usersToAdd.map(async(user) => {
            if (!community.members.includes(user._id)) {
                user
                    .joinedCommunities
                    .push(communityId);
                await user.save();
                newMembers.push(user._id)
            }
        }));

        community
            .members
            .push(...newMembers)
        await community.save()

        return res
            .status(200)
            .json({message: "Members added to the community successfully", community})
    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal Server Error"});
    }
}

const RemoveMembers = async(req, res) => {
    const {communityId} = req.params;
    const {userIds} = req.body;

    try {
        const community = await Community.findById(communityId);

        if (!community) 
            return res.status(404).json({message: "Community not found"});
        
        if (community.creator.toString() !== req.user.id) 
            return res.status(403).json({message: "Permission denied. You are not the creator of this community"});
        
        const usersToRemove = await User.find({
            _id: {
                $in: userIds
            }
        });

        let removedMembers = []

        await Promise.all(usersToRemove.map(async(user) => {
            if (community.members.includes(user._id)) {
                user.joinedCommunities = user
                    .joinedCommunities
                    .filter((community) => community.toString() !== communityId);
                await user.save();
                removedMembers.push(user._id.toString())
            }
        }));

        community.members = community
            .members
            .filter((member) => !removedMembers.includes(member.toString()));
        await community.save();

        return res
            .status(200)
            .json({message: "Members removed from the community successfully", community});
    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal Server Error"});
    }
}

const SendCommunityJoinRequest = async(req, res) => {
    const {communityId} = req.params
    const userId = req.user.id

    try {
        const user = await User.findById(userId)
        const community = await Community.findById(communityId);

        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"})
        }

        if (!community) {
            return res
                .status(404)
                .json({message: "Community not found"})
        }

        if (community.members.includes(userId)) {
            return res
                .status(400)
                .json({message: "You are already a member of this community"});
        }

        if (community.privacy === "public") {
            community
                .members
                .push(userId)
            user
                .joinedCommunities
                .push(communityId)
            await community.save()
            await user.save()
            return res
                .status(200)
                .json({message: "You have joined the public community"})
        }

        const notification = new Notification({recipient: community.creator, community: communityId, type: "community join request", content: `${user.name} wants to join your community "${community.name}"`})
        await notification.save()

        return res
            .status(200)
            .json({message: "Community join request sent successfully"});
    } catch (error) {
        res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const SendCommunityInviteRequest = async(req, res) => {
    const {communityId, recipientUserId} = req.params;
    const ownerId = req.user.id;

    try {
        const community = await Community.findById(communityId)
        if (!community) {
            return res
                .status(404)
                .json({message: "Community not found"});
        }

        if (community.creator.toString() !== ownerId) {
            return res
                .status(403)
                .json({message: "You do not have permission to send invites for this community"});
        }

        const recipientUser = await User.findById(recipientUserId)
        if (!recipientUser) {
            return res
                .status(404)
                .json({message: "Recipient user not found"});
        }

        const notification = new Notification({recipient: recipientUserId, community: communityId, type: "community invite request", content: `You are invited to join the community "${community.name}"`});

        await notification.save();

        return res
            .status(200)
            .json({message: "Community invite request sent successfully"});
    } catch (error) {
        return res
            .status(500)
            .json({message: "Internal server error"});
    }
}

module.exports = {
    GetCommunity,
    CreateCommunity,
    DeleteCommunity,
    UpdateCommunity,
    AddMembers,
    SendCommunityJoinRequest,
    RemoveMembers,
    SendCommunityInviteRequest
};