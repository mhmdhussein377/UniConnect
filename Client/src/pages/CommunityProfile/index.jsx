import {BiHash} from "react-icons/bi";
import {AiTwotoneLock} from "react-icons/ai"
import Header from "./../../components/Header";
import Member from "./../../components/Member"
import {useContext, useEffect, useState} from "react";
import {HiPencil} from "react-icons/hi"
import {useParams} from "react-router-dom";
import {getRequest, postRequest} from "./../../utils/requests"
import About from "./../../components/About"
import {AuthContext} from "./../../Context/AuthContext"
import Button from "./UI/Button"

// MODALS
import UpdateCommunityModal from "./modals/UpdateCommunityModal"
import AddMembersModal from "./../../components/AddMembersModal"
import DeleteCommunity from "./modals/DeleteCommunityModal"
import KickUsersModal from "./modals/KickUsersModal"
import RequestedUsersModal from "./modals/RequestedUsersModal"

const index = () => {

    const {id} = useParams()
    const {user, dispatch} = useContext(AuthContext)

    const [community,
        setCommunity] = useState({})
    const [userStatus,
        setUserStatus] = useState({isCreator: false, isMember: false, isInvited: false, isRequested: false, privacy: ""})
    const [buttonText,
        setButtonText] = useState("")
    const [requesters,
        setRequesters] = useState([])
    const [members,
        setMembers] = useState([])
    const [loading,
        setLoading] = useState(false)

    const [showUpdateCommunityModal,
        setShowUpdateCommunityModal] = useState(false)
    const [showAddMembersModal,
        setShowAddMembersModal] = useState(false)
    const [showDeleteCommunityModal,
        setShowDeleteCommunityModal] = useState(false)
    const [showKickUsersModal,
        setShowKickUsersModal] = useState(false)
    const [showRequestedUsersModal,
        setShowRequestedUsersModal] = useState(false)

    let {name, privacy, description, _id} = community

    useEffect(() => {
        const getCommunity = async() => {
            const response = await getRequest(`/community/${id}`)
            if (!response) 
                return;
            
            const community = response.community;

            setCommunity(community);
            setRequesters(community.requestedUsers)
            setMembers(community.members)

            setUserStatus((prev) => ({
                ...prev,
                isMember: isMember(community, user),
                isCreator: isCreator(community, user),
                isInvited: isInvited(community, user),
                isRequested: isRequested(community, user),
                privacy: getPrivacyStatus(community)
            }));
        }
        getCommunity()
    }, [id, user])

    const isMember = (community, user) => community
        .members
        .some(member => member._id === user._id)

    const isCreator = (community, user) => community.creator._id === user._id

    const isInvited = (community, user) => community
        .invitedUsers
        .includes(user._id)

    const isRequested = (community, user) => community
        .requestedUsers
        .some(requestedUser => requestedUser._id === user._id)

    const getPrivacyStatus = (community) => community.privacy === "public"
        ? "public"
        : "private";

    useEffect(() => {
        const {isMember, isInvited, isRequested, privacy} = userStatus;

        const determineButtonText = () => {
            if (privacy === "public" && !isMember) 
                return "Join community";
            if (privacy === "private" && !isMember && !isRequested && !isInvited) 
                return "Request to join";
            if (isMember) 
                return "Leave community";
            if (isInvited) 
                return "Accept invite request";
            if (isRequested) 
                return "Cancel request";
            };
        
        setButtonText(determineButtonText())
    }, [userStatus])

    const handleJoinLeaveCommunity = async() => {
        setLoading(true)
        const {isMember, isInvited, isRequested, privacy} = userStatus
        try {
            if (!isMember && privacy === "public") {
                setUserStatus((prev) => ({
                    ...prev,
                    isMember: true
                }));
                setMembers(prev => [
                    ...prev, {
                        name: user.name,
                        username: user.username,
                        _id: user._id
                    }
                ])
                await postRequest(`/community/send-community-join-request/${id}`);
            } else if (!isMember && privacy === "private" && !isRequested && !isInvited) {
                setUserStatus((prev) => ({
                    ...prev,
                    isRequested: true
                }));
                await postRequest(`/community/send-community-join-request/${id}`);
            } else if (isMember) {
                setUserStatus((prev) => ({
                    ...prev,
                    isMember: false,
                    isInvited: false,
                    isRequested: false
                }))
                setMembers(prev => prev.filter(member => member._id !== user._id))
                await postRequest(`/community/leave/${id}`);
                dispatch({type: 'LEAVE_COMMUNITY', payload: id})
            } else if (isInvited) {
                setUserStatus((prev) => ({
                    ...prev,
                    isMember: true
                }));
                await postRequest(`/community/accept-community-invite-request/${id}`);
            } else if (isRequested) {
                setUserStatus((prev) => ({
                    ...prev,
                    isRequested: false
                }));
                await postRequest(`/community/cancel-community-join-request/${id}`);
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header profile={true}/>
            <div className="bg-gray-100 py-6 h-full flex-1 dark:bg-grayMedium">
                <div
                    className="w-full max-w-[1200px] mx-auto px-8 flex flex-col min-[980px]:flex-row gap-4">
                    <div className="flex-[7] flex flex-col gap-6">
                        <div className="bg-white dark:bg-black dark:text-white drop-shadow-lg rounded-md p-4 flex flex-col">
                            <div className="flex items-center gap-2 w-full">
                                <div>
                                    {community.privacy === "public"
                                        ? (<BiHash size={80}/>)
                                        : (<AiTwotoneLock size={80}/>)}
                                </div>
                                <div className="flex items-center w-full gap-3">
                                    <div className="flex justify-between flex-1 flex-col gap-2">
                                        <div className="text-2xl font-medium text-primary">
                                            {community.name}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {members
                                                ? <span>{members
                                                            ?.length + 1}</span>
                                                : null}
                                            Member{members
                                                ?.length > 0 && "s"}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between gap-2.5">
                                        <div
                                            className={`w-fit ml-auto ${community
                                            ?.creator
                                                ?._id === user
                                                    ?._id
                                                        ? "visible"
                                                        : "invisible"}`}>
                                            <HiPencil
                                                onClick={() => setShowUpdateCommunityModal(true)}
                                                className="cursor-pointer"
                                                size={30}/>
                                        </div>
                                        {buttonText && !userStatus.isCreator && (
                                            <button
                                                disabled={loading}
                                                onClick={handleJoinLeaveCommunity}
                                                className="bg-primary text-white px-2 py-1.5 rounded-md">
                                                {buttonText}
                                            </button>
                                        )
}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <About data={community.description}/>
                    </div>
                    <div
                        className="flex-[5] bg-white dark:bg-black dark:text-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3 h-fit max-h-[500px] overflow-scroll overflow-x-hidden scrollbar-hide">
                        {userStatus.isCreator && (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <Button text="Invite Users" setModal={setShowAddMembersModal}/> {privacy === "private" && <Button text="Requested Users" setModal={setShowRequestedUsersModal}/>}
                                </div>
                                <div className="flex items-center gap-4">
                                    <Button text="Remove members" setModal={setShowKickUsersModal}/>
                                    <Button text="Delete community" setModal={setShowDeleteCommunityModal}/>
                                </div>
                            </div>
                        )}
                        <div className="font-medium text-lg text-primary">Members</div>
                        <div className="flex flex-col gap-2">
                            {community.creator
                                ? (<Member
                                    creator={true}
                                    member={community
                                    ?.creator}/>)
                                : null}
                            {members
                                ?.length > 0
                                    ? members.map((member, index) => (<Member key={index} member={member}/>))
                                    : null}
                        </div>
                    </div>
                </div>
            </div>
            {showUpdateCommunityModal && (<UpdateCommunityModal
                setCommunity={setCommunity}
                _id={_id}
                name={name}
                description={description}
                privacy={privacy}
                setShowUpdateCommunityModal={setShowUpdateCommunityModal}/>)}
            {showAddMembersModal && (<AddMembersModal
                communityId={community._id}
                setShowAddMembersModal={setShowAddMembersModal}/>)}
            {showDeleteCommunityModal && (<DeleteCommunity
                communityName={community.name}
                communityId={community._id}
                setShowDeleteCommunityModal={setShowDeleteCommunityModal}/>)}
            {showKickUsersModal && (<KickUsersModal
                setCommunity={setCommunity}
                communityId={_id}
                members={members}
                setMembers={setMembers}
                setShowKickUsersModal={setShowKickUsersModal}/>)}
            {showRequestedUsersModal && (<RequestedUsersModal
                setShowRequestedUsersModal={setShowRequestedUsersModal}
                setCommunity={setCommunity}
                communityId={_id}
                setUsers={setRequesters}
                users={requesters}/>)}
        </div>
    );
};

export default index;
