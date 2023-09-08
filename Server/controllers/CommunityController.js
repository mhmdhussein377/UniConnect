const Community = require("./../models/Community")

const getCommunity = async(req, res) => {
    const {communityId} = req.params

    try {
        const community = await Community.findById(communityId)

        if(!community)
            return res.status(404).json({error: "Community not found"})

        return res.status(200).json({community})
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {getCommunity}