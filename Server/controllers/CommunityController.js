const Community = require("./../models/Community")
const User = require("./../models/User")
const Notification = require("./../models/Notification")

const GetCommunity = async(req, res) => {
    const {communityId} = req.params

    try {
        const community = await Community
            .findById(communityId)
            .populate({path: "members", select: "name username _id profile.profileImage"})
            .populate({path: "requestedUsers", select: "name username _id profile.profileImage"})
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
            .json(await savedCommunity.populate("creator"))
    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal server error"});
    }
}

const DeleteCommunity = async(req, res) => {
    const {communityId} = req.params
    const userId = req
        ?.user
            ?.id
    const {communityName} = req.body

    try {
        const community = await Community.findById(communityId);
        if (!community) 
            return res.status(404).json({message: "Community not found"})

        if (communityName === community.name) {
            if (community.creator.toString() !== userId) 
                return res.status(403).json({message: "Permission denied"});
            
            const creator = await User.findById(community.creator);
            if (creator) {
                creator.createdCommunities = creator
                    .createdCommunities
                    .filter((community) => community.toString() !== communityId);
                await creator.save();
            }

            await User.updateMany({
                joinedCommunities: communityId
            }, {
                $pull: {
                    joinedCommunities: communityId
                }
            });

            await Community.findByIdAndDelete(communityId);

            return res
                .status(200)
                .json({message: "Community deleted successfully"});
        } else {
            return res
                .status(400)
                .json({message: "Community name error"})
        }
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

const MarkMessagesAsRead = async(req, res) => {
    try {
        const communityId = req.params.communityId;
        const userId = req
            ?.user
                ?.id

        const community = await Community.findById(communityId);

        if (!community) {
            return res
                .status(404)
                .json({message: "Community not found"});
        }

        for (const message of community.chat) {
            if (!message.readBy.includes(userId)) {
                message
                    .readBy
                    .push(userId);
            }
        }

        await community.save();

        res.json({message: "Messages marked as read"});
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({message: "Server Error"});
    }
};

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
    const {usersIds} = req.body;

    try {
        const community = await Community.findById(communityId);

        if (!community) 
            return res.status(404).json({message: "Community not found"});
        
        if (community.creator.toString() !== req.user.id) 
            return res.status(403).json({message: "Permission denied. You are not the creator of this community"});
        
        const usersToRemove = await User.find({
            _id: {
                $in: usersIds
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

const LeaveCommunity = async(req, res) => {
    const {communityId} = req.params
    const userId = req
        ?.user
            ?.id

    try {
        const user = await User.findById(userId)
        const community = await Community.findById(communityId)

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

        const isMember = community
            .members
            .includes(userId)

        if (!isMember) {
            return res
                .status(400)
                .json({message: "You are not a member in this community"})
        }

        community.members = community
            .members
            .filter(member => member.toString() !== userId)
        await community.save()

        user.joinedCommunities = user
            .joinedCommunities
            .filter(comm => comm.toString() !== communityId)
        await user.save()

        return res
            .status(200)
            .json({message: "Successfully left the community"});
    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal Server Error"});
    }
}

const SendCommunityJoinRequest = async(req, res) => {
    const {communityId} = req.params
    const userId = req
        ?.user
            ?.id

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
            await community.save()

            user
                .joinedCommunities
                .push(communityId)
            await user.save()
            return res
                .status(200)
                .json({message: "You have joined the public community"})
        }

        if (community.requestedUsers.includes(userId) || community.invitedUsers.includes(userId)) {
            return res
                .status(400)
                .json({message: "The recipient has a pending join request or invitation for this community"});
        }

        community
            .requestedUsers
            .push(userId)
        await community.save()

        const notification = new Notification({recipient: community.creator, sender: userId, community: communityId, type: "community join request", content: `${user.name} wants to join your community "${community.name}"`});
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

const CancelCommunityJoinRequest = async(req, res) => {
    const {communityId} = req.params;
    const userId = req
        ?.user
            ?.id;

    try {
        const community = await Community.findById(communityId);
        const user = await User.findById(userId);

        if (!community) {
            return res
                .status(404)
                .json({message: "Community not found"});
        }

        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"});
        }

        if (community.members.includes(userId)) {
            return res
                .status(400)
                .json({message: "You are already a member of this community"});
        }

        if (!community.requestedUsers.includes(userId)) {
            return res
                .status(400)
                .json({message: "You do not have a pending join request for this community"});
        }

        const existingNotification = await Notification.findOneAndDelete({sender: userId, recipient: community.creator, type: "community join request", status: "pending", community: communityId})

        if (!existingNotification) {
            return res
                .status(400)
                .json({message: 'Notification not found'})
        }

        community.requestedUsers = community
            .requestedUsers
            .filter(user => user.toString() !== userId)
        await community.save()

        await user.save()

        return res
            .status(200)
            .json({message: "Join request canceled successfully"});
    } catch (error) {
        return res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const AcceptCommunityJoinRequest = async(req, res) => {
    const {communityId, requesterUserId} = req.params;
    const ownerId = req
        ?.user
            ?.id;

    try {
        const community = await Community.findById(communityId);

        if (!community) {
            return res
                .status(404)
                .json({message: "Community not found"});
        }

        if (community.creator.toString() !== ownerId) {
            return res
                .status(403)
                .json({message: "You do not have permission to accept join requests for this community"});
        }

        const requestedUser = await User.findById(requesterUserId);

        if (!requestedUser) {
            return res
                .status(404)
                .json({message: "Requested user not found"});
        }

        if (!community.requestedUsers.includes(requesterUserId)) {
            return res
                .status(400)
                .json({message: "The requested user does not have a pending join request for this community"});
        }

        community
            .members
            .push(requesterUserId);
        const requestIndex = community
            .requestedUsers
            .indexOf(requesterUserId);
        if (requestIndex !== -1) {
            community
                .requestedUsers
                .splice(requestIndex, 1);
        }
        await community.save();

        requestedUser
            .joinedCommunities
            .push(communityId);
        await requestedUser.save();

        await Notification.findOneAndUpdate({
            recipient: ownerId,
            sender: requesterUserId,
            community: communityId,
            type: "community join request",
            status: "pending"
        }, {
            $set: {
                status: "accepted",
                isRead: true
            }
        });

        const notification = new Notification({recipient: requesterUserId, sender: ownerId, community: communityId, type: "community join accepted", content: `Your join request
        for the community "${community.name}" has been accepted`});
        await notification.save();

        return res
            .status(200)
            .json({message: "Community join request accepted successfully"});
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({message: "Internal server error"});
    }
};

const RejectCommunityJoinRequest = async(req, res) => {
    const currentUserId = req
        ?.user
            ?.id
    const {requestedUserId, communityId} = req.params;

    try {
        const user = await User.findById(currentUserId)

        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"})
        }

        const community = await Community.findById(communityId);

        if (!community) {
            return res
                .status(404)
                .json({message: "Community not found"});
        }

        if (community.creator.toString() !== currentUserId) {
            return res
                .status(403)
                .json({message: "You do not have permission to accept join requests for this community"});
        }

        const requestedUser = await User.findById(requestedUserId);

        if (!requestedUser) {
            return res
                .status(404)
                .json({message: "Requested user not found"});
        }

        if (!community.requestedUsers.includes(requestedUserId)) {
            return res
                .status(400)
                .json({message: "The requested user does not have a pending join request for this community"});
        }

        const requestIndex = community
            .requestedUsers
            .indexOf(requestedUserId);
        if (requestIndex !== -1) {
            community
                .requestedUsers
                .splice(requestIndex, 1);
        }
        await community.save();

        const existingNotification = await Notification.findOneAndDelete({sender: requestedUserId, recipient: currentUserId, type: "community join request", status: "pending", community: communityId});

        if (!existingNotification) {
            return res
                .status(400)
                .json({message: "Notification not found"});
        }

        return res
            .status(200)
            .json({message: "Join request rejected successfully"});

    } catch (error) {
        return res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const AcceptCommunityJoinRequests = async(req, res) => {
    const {communityId} = req.params
    const {requestedUsersIds} = req.body;
    const ownerId = req
        ?.user
            ?.id;

    try {
        const community = await Community.findById(communityId);

        if (!community) {
            return res
                .status(404)
                .json({message: "Community not found"});
        }

        if (community.creator.toString() !== ownerId) {
            return res
                .status(403)
                .json({message: "You do not have permission to accept join requests for this community"});
        }

        const requestedUsers = await User.find({
            _id: {
                $in: requestedUsersIds
            }
        });

        if (requestedUsers.length !== requestedUsersIds.length) {
            return res
                .status(400)
                .json({message: "One or more requested users were not found"});
        }

        for (const requestedUser of requestedUsers) {
            if (!community.requestedUsers.includes(requestedUser._id)) {
                continue
            }

            community
                .members
                .push(requestedUser._id)
            community.requestedUsers = community
                .requestedUsers
                .filter(user => user.toString() !== requestedUser._id.toString())
            await community.save()

            requestedUser
                .joinedCommunities
                .push(communityId)
            requestedUser.save()

            await Notification.findOneAndUpdate({
                recipient: ownerId,
                sender: requestedUser._id,
                community: communityId,
                type: "community join request",
                status: "pending"
            }, {
                $set: {
                    status: "accepted",
                    isRead: true
                }
            });

            const notification = new Notification({recipient: requestedUser._id, sender: ownerId, community: communityId, type: "community join accepted", content: `Your join request
        for the community "${community.name}" has been accepted`});
            await notification.save();
        }

        return res
            .status(200)
            .json({message: "Community join requests accepted successfully"})
    } catch (error) {
        return res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const SendCommunityInviteRequest = async(req, res) => {
    const {communityId, recipientUserId} = req.params;
    const ownerId = req
        ?.user
            ?.id;

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

        if (community.members.includes(recipientUserId)) {
            return res
                .status(400)
                .json({message: "The recipient is already a member of this community"});
        }

        if (community.requestedUsers.includes(recipientUserId) || community.invitedUsers.includes(recipientUserId)) {
            return res
                .status(400)
                .json({message: "The recipient has a pending join request or invitation for this community"});
        }

        community
            .invitedUsers
            .push(recipientUserId);
        await community.save();

        const notification = new Notification({recipient: recipientUserId, sender: ownerId, community: communityId, type: "community invite request", content: `You are invited to join the community "${community.name}"`});
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

const CancelCommunityInviteRequest = async(req, res) => {
    const {communityId, recipientUserId} = req.params;
    const ownerId = req
        ?.user
            ?.id;

    try {
        const community = await Community.findById(communityId)
        if (!community) {
            return res
                .status(404)
                .json({message: "Community not found"});
        }

        const user = await User.findById(ownerId)
        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"});
        }

        if (community.creator.toString() !== ownerId) {
            return res
                .status(403)
                .json({message: "You do not have permission to cancel invites for this community"});
        }

        const recipientUser = await User.findById(recipientUserId);
        if (!recipientUser) {
            return res
                .status(404)
                .json({message: "Recipient user not found"});
        }

        if (!community.invitedUsers.includes(recipientUserId)) {
            return res
                .status(400)
                .json({message: "The recipient does not have a pending invitation for this community"});
        }

        const indexOfRecipient = community
            .invitedUsers
            .indexOf(recipientUserId);
        community
            .invitedUsers
            .splice(indexOfRecipient, 1);
        await community.save()

        await Notification.deleteOne({recipient: recipientUserId, community: communityId, type: "community invite request", status: "pending"});

        return res
            .status(200)
            .json({message: "Community invite request canceled successfully"});
    } catch (error) {
        return res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const AcceptCommunityInviteRequest = async(req, res) => {
    const {communityId} = req.params;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        const community = await Community.findById(communityId);

        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"});
        }

        if (!community) {
            return res
                .status(404)
                .json({message: "Community not found"});
        }

        if (community.members.includes(userId)) {
            return res
                .status(400)
                .json({message: "You are already a member of this community"});
        }

        if (!community.invitedUsers.includes(userId)) {
            return res
                .status(400)
                .json({message: "You have not been invited to this community"});
        }

        community
            .members
            .push(userId);

        const inviteIndex = community
            .invitedUsers
            .indexOf(userId);
        if (inviteIndex !== -1) {
            community
                .invitedUsers
                .splice(inviteIndex, 1);
        }
        await community.save();

        await Notification.findOneAndUpdate({
            recipient: userId,
            sender: community.creator,
            community: communityId,
            type: "community invite request",
            status: "pending"
        }, {
            $set: {
                isRead: true,
                status: "accepted"
            }
        });

        const notification = new Notification({sender: userId, recipient: community.creator, community: communityId, type: "community invite accepted", content: `${user.username} has accepted an invitation to join the community "${community.name}"`})
        await notification.save()

        user
            .joinedCommunities
            .push(communityId);
        await user.save();

        return res
            .status(200)
            .json({message: "Community invite request accepted successfully"});
    } catch (error) {
        return res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const RejectCommunityInviteRequest = async(req, res) => {
    const userId = req
        ?.user
            ?.id
    const {communityId} = req.params

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"})
        }

        const community = await Community.findById(communityId)

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

        const inviteIndex = community
            .invitedUsers
            .indexOf(userId);
        if (inviteIndex !== -1) {
            community
                .invitedUsers
                .splice(inviteIndex, 1);
        }
        await community.save();

        const existingNotification = await Notification.findOneAndUpdate({
            recipient: userId,
            sender: community.creator,
            community: communityId,
            type: "community invite request",
            status: "pending"
        }, {
            $set: {
                isRead: true,
                status: "rejected"
            }
        });

        if (!existingNotification) {
            return res
                .status(404)
                .json({message: "Notification not found"})
        }

        return res
            .status(200)
            .json({message: "Community invite request rejected successfully"});
    } catch (error) {
        return res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const GetCommunities = async(req, res) => {
    const userId = req.user
        ?.id

    try {
        const user = await User
            .findById(userId)
            .populate("createdCommunities")
            .populate("joinedCommunities")

        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"})
        }

        res
            .status(200)
            .json([
                ...user.createdCommunities,
                ...user.joinedCommunities
            ])
    } catch (error) {
        res
            .status(500)
            .json({message: "Server error"});
    }
}

const GetCommunitiesDetails = async(req, res) => {
    const userId = req.user
        ?.id

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"});
        }

        const joinedCommunityDetails = await Promise.all(user.joinedCommunities.map(async(communityId) => {
            const community = await Community.findById(communityId);
            if (community) {
                const unreadCount = community
                    .chat
                    .reduce((count, message) => {
                        if (!message.readBy.includes(userId)) {
                            return count + 1;
                        }
                        return count;
                    }, 0);
                return {
                    ID: community._id,
                    name: community.name,
                    privacy: community.privacy,
                    unreadCount,
                    lastMessages: community
                        .chat
                        .slice(-5)
                };
            }
            return null;
        }));

        const createdCommunityDetails = await Promise.all(user.createdCommunities.map(async(communityId) => {
            const community = await Community.findById(communityId);
            if (community) {
                const unreadCount = community
                    .chat
                    .reduce((count, message) => {
                        if (!message.readBy.includes(userId)) {
                            return count + 1;
                        }
                        return count;
                    }, 0);
                const {_id, name, privacy, chat} = community
                return {
                    ID: _id,
                    name: name,
                    privacy: privacy,
                    unreadCount,
                    lastMessages: chat.slice(-5)
                };
            }
            return null;
        }));

        return res
            .status(200)
            .json([
                ...joinedCommunityDetails.filter(community => community !== null),
                ...createdCommunityDetails.filter(community => community !== null)
            ])
    } catch (error) {
        res
            .status(500)
            .json({message: "Server error"});
    }
}

const GetCommunityDetails = async(req, res) => {
    const {communityId} = req.params

    try {
        const community = await Community
            .findById(communityId)
            .select("-invitedUsers -requestedUsers")
            .populate("creator members chat.sender", "_id name username online profile.profileImage")

        if (!community) {
            return res
                .status(404)
                .json({message: "Community not found"});
        }

        res
            .status(200)
            .json(community);
    } catch (error) {
        res
            .status(500)
            .json({message: "Server error"});
    }
}

const AddNewCommunityMessage = async(req, res) => {
    const {communityId} = req.params
    const userId = req.user
        ?.id

    try {
        const community = await Community.findById(communityId)

        if (!community) {
            return res
                .status(404)
                .json({message: "Community not found"})
        }

        if (!community.members.includes(userId) && !community.creator === userId) {
            return res
                .status(403)
                .json({message: "User is not a member of the community"})
        }

        const {content, fileURL} = req.body
        if (!content && !fileURL) {
            return res
                .status(400)
                .json({message: "Message content or fileURL is required"})
        }

        const newMessage = {
            sender: userId,
            content,
            fileURL,
            readBy: [userId]
        }

        community
            .chat
            .push(newMessage)
        await community.save()

        return res
            .status(200)
            .json({message: "Message added successfully"})
    } catch (error) {
        res
            .status(500)
            .json({message: "Server error"});
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
    SendCommunityInviteRequest,
    AcceptCommunityJoinRequest,
    AcceptCommunityInviteRequest,
    LeaveCommunity,
    CancelCommunityJoinRequest,
    CancelCommunityInviteRequest,
    AcceptCommunityJoinRequests,
    RejectCommunityJoinRequest,
    RejectCommunityInviteRequest,
    GetCommunities,
    GetCommunitiesDetails,
    GetCommunityDetails,
    AddNewCommunityMessage,
    MarkMessagesAsRead
};