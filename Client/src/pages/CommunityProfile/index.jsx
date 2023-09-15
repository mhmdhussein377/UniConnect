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

// MODALS
import UpdateCommunityModal from "./modals/UpdateCommunityModal"
import AddMembersModal from "./../../components/AddMembersModal"
import DeleteCommunity from "./modals/DeleteCommunityModal"
import KickUsersModal from "./modals/KickUsersModal"
import RequestedUsersModal from "./modals/RequestedUsersModal"

const index = () => {

    const {id} = useParams()
    const {user} = useContext(AuthContext)

    let [community,
        setCommunity] = useState({})
    let [userStatus,
        setUserStatus] = useState({isCreator: false, isMember: false, isInvited: false, isRequested: false, privacy: ""})
    let [buttonText,
        setButtonText] = useState("")
    let [requesters,
        setRequesters] = useState([])
    let [loading,
        setLoading] = useState(false)

    let [showUpdateCommunityModal,
        setShowUpdateCommunityModal] = useState(false)
    let [showAddMembersModal,
        setShowAddMembersModal] = useState(false)
    let [showDeleteCommunityModal,
        setShowDeleteCommunityModal] = useState(false)
    let [showKickUsersModal,
        setShowKickUsersModal] = useState(false)
    let [showRequestedUsersModal,
        setShowRequestedUsersModal] = useState(false)

    let {name, privacy, description, _id, members} = community

    useEffect(() => {
        const getCommunity = async() => {
            const response = await getRequest(`/community/${id}`)
            if (!response) 
                return;
            
            const community = response.community;

            setCommunity(community);
            setRequesters(community.requestedUsers)

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
        if (privacy === "public" && !isMember) {
            console.log("first")
            setButtonText("Join community")
        } else if (privacy === "private" && !isMember && !isRequested && !isInvited) {
            console.log("second")
            setButtonText("Request to join")
        } else if (isMember) {
            console.log("third")
            setButtonText("Leave community")
        } else if (isRequested) {
            console.log("fourth")
            setButtonText("Cancel request")
        } else if (isInvited) {
            console.log("fifth")
            setButtonText("Accept invite request")
        }
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
                const response = await postRequest(`/community/send-community-join-request/${id}`);
                console.log(response);
            } else if (!isMember && privacy === "private" && !isRequested && !isInvited) {
                setUserStatus((prev) => ({
                    ...prev,
                    isRequested: true
                }));
                const response = await postRequest(`/community/send-community-join-request/${id}`);
                console.log(response);
            } else if (isMember) {
                setUserStatus((prev) => ({
                    ...prev,
                    isMember: false,
                    isInvited: false,
                    isRequested: false
                }));
                const response = await postRequest(`/community/leave/${id}`);
                console.log(response);
            } else if (isInvited) {
                setUserStatus((prev) => ({
                    ...prev,
                    isMember: true
                }));
                const response = await postRequest(`/community/accept-community-invite-request/${id}`);
                console.log(response);
            } else if (isRequested) {
                setUserStatus((prev) => ({
                    ...prev,
                    isRequested: false
                }));
                const response = await postRequest(`/community/cancel-community-join-request/${id}`);
                console.log(response);
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
            <div className="bg-gray-100 py-6 h-full flex-1">
                <div
                    className="w-full max-w-[1200px] mx-auto px-8 flex flex-col min-[980px]:flex-row gap-4">
                    <div className="flex-[7] flex flex-col gap-6">
                        <div className="bg-white drop-shadow-lg rounded-md p-4 flex flex-col">
                            <div className="flex items-center gap-2 w-full">
                                <div>
                                    {community.privacy === "public"
                                        ? (<BiHash size={80}/>)
                                        : (<AiTwotoneLock size={80}/>)}
                                </div>
                                <div className="flex items-center w-full gap-3">
                                    <div className="flex justify-between flex-1 flex-col gap-2">
                                        <div className="text-2xl font-medium">
                                            {community.name}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {community
                                                ?.members
                                                    ? (
                                                        <span>{community
                                                                ?.members
                                                                    ?.length + 1}</span>
                                                    )
                                                    : null}
                                            Member{community
                                                ?.members
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
                                        {< div > {
                                            !userStatus.isCreator && (
                                                <button
                                                    disabled={loading}
                                                    onClick={handleJoinLeaveCommunity}
                                                    className="bg-primary text-white px-2 py-1.5 rounded-md">
                                                    {buttonText}
                                                </button>
                                            )
                                        } </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <About data={community.description}/>
                    </div>
                    <div
                        className="flex-[5] bg-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3 h-fit max-h-[500px] overflow-scroll overflow-x-hidden scrollbar-hide">
                        {userStatus.isCreator && (
                            <div className="flex flex-col gap-4">
                                {privacy === "private" && <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setShowAddMembersModal(true)}
                                        className="w-full bg-primary text-white rounded-md py-1 text-lg font-medium">
                                        Invite users
                                    </button>
                                    <button
                                        onClick={() => setShowRequestedUsersModal(true)}
                                        className="w-full bg-primary text-white rounded-md py-1 text-lg font-medium">
                                        Requested users
                                    </button>
                                </div>}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setShowKickUsersModal(true)}
                                        className="w-full bg-primary text-white rounded-md py-1 text-lg font-medium">
                                        Kick members
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteCommunityModal(true)}
                                        className="w-full bg-primary text-white rounded-md py-1 text-lg font-medium">
                                        Delete community
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="font-medium text-lg">Members</div>
                        <div className="flex flex-col gap-2">
                            {community.creator
                                ? (<Member
                                    creator={true}
                                    searched={true}
                                    member={community
                                    ?.creator}/>)
                                : null}
                            {community
                                ?.members
                                    ?.length > 0
                                        ? community
                                            .members
                                            .map((member, index) => (<Member key={index} member={member} searched={true}/>))
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
