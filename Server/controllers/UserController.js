const User = require("./../models/User")
const Community = require("./../models/Community")

const EditProfile = async(req, res) => {
    const userId = req.user.id

    try {
        const {
            name,
            bio,
            nickname,
            major,
            skills,
            languages,
            location,
            university,
            profileImage,
            coverImage,
            hobbies
        } = req.body

        const updatedFields = {
            name,
            "profile.bio": bio,
            "profile.nickname": nickname,
            "profile.major": major,
            "profile.skills": skills,
            "profile.languages": languages,
            "profile.location": location,
            "profile.university": university,
            "profile.profileImage": profileImage,
            "profile.coverImage": coverImage,
            "profile.hobbies": hobbies
        };

        const user = await User.findByIdAndUpdate(userId, {
            $set: updatedFields
        }, {new: true})

        if (!user) 
            return res.status(404).json({message: "User not found"})

        return res
            .status(200)
            .json({user});

    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal server error"});
    }
}

const UserData = async(req, res) => {
    const {username} = req.params;

    try {
        const user = await User
            .findOne({username})
            .populate({
                path: "joinedCommunities",
                select: "_id name privacy",
                populate: {
                    path: "creator",
                    select: "username"
                }
            })
            .populate({
                path: "createdCommunities",
                select: "_id name privacy",
                populate: {
                    path: "creator",
                    select: "username"
                }
            })
            .populate({path: "friends", select: "_id name username online profile.profileImage"})

        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"});
        }

        const {
            password,
            ...others
        } = user._doc

        return res
            .status(200)
            .json({user: others});
    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal server error"});
    }
};

const GetFriends = async(req, res) => {
    const userId = req
        ?.user
            ?.id
    const {communityId} = req.params

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

        const friends = await User.find({
            $and: [
                {
                    _id: {
                        $in: user.friends
                    }
                }, {
                    _id: {
                        $nin: community.members
                    }
                }, {
                    _id: {
                        $nin: community.invitedUsers
                    }
                }, {
                    _id: {
                        $nin: community.requestedUsers
                    }
                }
            ]
        });

        return res
            .status(200)
            .json({friends})

    } catch (error) {
        res
            .status(500)
            .json({error: "Internal server error"});
    }
}

const SearchUsers = async(req, res) => {
    const {searchTerm} = req.params
    const {communityId} = req.params

    try {
        const community = await Community.findById(communityId)

        if (!community) {
            return res
                .status(404)
                .json({message: "Community not found"})
        }

        const users = await User.find({
            $or: [
                {
                    name: {
                        $regex: searchTerm,
                        $options: "i"
                    }
                }, {
                    username: {
                        $regex: searchTerm,
                        $options: "i"
                    }
                }
            ],
            $and: [
                {
                    _id: {
                        $nin: community.members
                    }
                }, {
                    _id: {
                        $nin: community.invitedUsers
                    }
                }, {
                    _id: {
                        $nin: community.requestedUsers
                    }
                }, {
                    _id: {
                        $ne: community.creator
                    }
                }
            ]
        });

        return res
            .status(200)
            .json({users});
    } catch (error) {
        res
            .status(500)
            .json({error: "Internval server error"});
    }
}

const SearchUsersCommunities = async(req, res) => {
    const {searchTerm} = req.params
    const userId = req
        ?.user
            ?.id

    try {
        if (!searchTerm) {
            return res
                .status(400)
                .json({message: "Missing searchTerm"})
        }

        const results = await Promise.all([
            User.aggregate([
                {
                    $match: {
                        _id: {
                            $ne: userId
                        },
                        $or: [
                            {
                                name: {
                                    $regex: searchTerm,
                                    $options: "i"
                                }
                            }, {
                                username: {
                                    $regex: searchTerm,
                                    $options: "i"
                                }
                            }
                        ]
                    }
                }, {
                    $project: {
                        _id: 1,
                        name: 1,
                        username: 1,
                        "profile.profileImage": 1,
                        type: "user"
                    }
                }
            ]),
            Community.aggregate([
                {
                    $match: {
                        name: {
                            $regex: searchTerm,
                            $options: "i"
                        }
                    }
                }, {
                    $lookup: {
                        from: "users",
                        localField: "creator",
                        foreignField: "_id",
                        as: "creatorInfo"
                    }
                }, {
                    $unwind: "$creatorInfo"
                }, {
                    $project: {
                        _id: 1,
                        name: 1,
                        privacy: 1,
                        creatorUsername: "$creatorInfo.username",
                        type: "community"
                    }
                }
            ])
        ]);

        const combinedResults = [...results]

        return res
            .status(200)
            .json({results: combinedResults});
    } catch (error) {
        return res
            .status(500)
            .json({error: "Internval server error"});
    }
}

const GetSuggestedUsers = async(req, res) => {
    const currentUser = req
        ?.user
            ?.id
    const {excludedUser} = req.body

    try {
        const user = await User.findById(currentUser)
        if (!user) {
            return res
                .status(400)
                .json({message: "User not found"})
        }

        const suggestedUsers = await User.find({
            _id: {
                $nin: [currentUser, excludedUser]
            },
            $or: [
                {
                    "profile.skills": {
                        $in: user.profile.skills
                    }
                }, {
                    "profile.major": {
                        $regex: new RegExp(user.profile.major, "i")
                    }
                }, {
                    "profile.university": {
                        $regex: new RegExp(user.profile.university, "i")
                    }
                }, {
                    "profile.location": {
                        $regex: new RegExp(user.profile.location, "i")
                    }
                }, {
                    "profile.hobbies": {
                        $in: user.profile.hobbies
                    }
                }
            ]
        }).select("name username profile.profileImage _id");

        const top = 5
        const result = suggestedUsers.slice(0, top)

        res
            .status(200)
            .json(result);
    } catch (error) {
        res
            .status(500)
            .json({error: "Internal Server Error"});
    }
}

module.exports = {
    EditProfile,
    UserData,
    SearchUsers,
    SearchUsersCommunities,
    GetFriends,
    GetSuggestedUsers
}