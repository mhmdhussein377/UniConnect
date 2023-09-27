import {useContext, useState} from "react";
import {AiOutlinePlus} from "react-icons/ai";
import {AiOutlineMinus} from "react-icons/ai";
import {AuthContext} from "../../Context/AuthContext";
import {Link} from "react-router-dom";
import {postRequest} from "../../utils/requests";
import ProfilePicture from "./../../assets/ProfilePicture.jpg"

const index = ({
    searched,
    member,
    creator,
    invite,
    communityId,
    online
}) => {

    const {user} = useContext(AuthContext)
    let [isInvited,
        setIsInvited] = useState(false)
    let [loading,
        setLoading] = useState(false)

    const {name, username, _id, profile} = member

    const actualUser = user._id === _id

    const handleInvite = async() => {
        setLoading(true)
        setIsInvited(!isInvited)

        try {
            if (isInvited) {
                await postRequest(`/community/cancel-community-invite-request/${communityId}/${_id}`);
            } else {
                await postRequest(`/community/send-community-invite-request/${communityId}/${_id}`);

            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <div
            className={`flex items-center justify-between gap-2 ${ !actualUser
            ? "cursor-pointer"
            : "cursor-auto"}`}>
            <Link
                to={!actualUser && `/profile/${username}`}
                className="flex items-center gap-2 flex-1">
                <div className="relative">
                    <img
                        className="cursor-pointer w-[45px] h-[45px] rounded-full overflow-hidden flex items-center justify-center object-cover"
                        src={profile?.profileImage || ProfilePicture}
                        alt="profile-picture"/> {online && (
                        <span
                            className="absolute w-[15px] h-[15px] bg-[limegreen] rounded-full top-0 right-0 border-2 border-white"></span>
                    )}
                </div>
                <div className="flex flex-col gap-0">
                    <div>
                        {name}
                        {user._id === _id && "(You)"}
                        {creator && "(Creator)"}
                    </div>
                    <p className="text-sm">{username}</p>
                </div>
            </Link>
            {invite && (isInvited
                ? (
                    <button
                        onClick={handleInvite}
                        disabled={loading}
                        className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium">
                        <AiOutlineMinus/>
                        Cancel Invite
                    </button>
                )
                : (
                    <button
                        onClick={handleInvite}
                        disabled={loading}
                        className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium">
                        <AiOutlinePlus/>
                        Invite
                    </button>
                ))}
            {searched && !actualUser && (
                <div>
                    {isInvited
                        ? (
                            <button
                                className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium">
                                <AiOutlineMinus/>
                                Remove friend
                            </button>
                        )
                        : (
                            <button
                                className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium">
                                <AiOutlinePlus/>
                                Add friend
                            </button>
                        )}
                </div>
            )}
        </div>
    );
};

export default index;
