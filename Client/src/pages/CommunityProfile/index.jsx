import {BiHash} from "react-icons/bi";
import {AiTwotoneLock} from "react-icons/ai"
import Header from "./../../components/Header";
import Member from "./../../components/Member"
import {useContext, useEffect, useState} from "react";
import {HiPencil} from "react-icons/hi"
import {useParams} from "react-router-dom";
import {getRequest} from "./../../utils/requests"
import About from "./../../components/About"
import {AuthContext} from "./../../Context/AuthContext"
import UpdateCommunityModal from "./../../components/UpdateCommunityModal"
import AddMembersModal from "./../../components/AddMembersModal"

const index = () => {

    const {id} = useParams()
    const {user} = useContext(AuthContext)

    let [community,
        setCommunity] = useState({})
    let [showUpdateCommunityModal,
        setShowUpdateCommunityModal] = useState(false)
    let [showAddMembersModal,
        setShowAddMembersModal] = useState(false)
    let [isMember,
        setIsMember] = useState(null)
    let [isCreator, setIsCreator] = useState(null)

    let {name, privacy, description, _id} = community

    useEffect(() => {
        const getCommunity = async() => {
            const response = await getRequest(`/community/${id}`)
            response && setCommunity(response.community)
            // check if the user is a member
            response && response.community?.members?.map(member => {
                        if (member._id === user._id) {
                            setIsMember(true)
                            return
                        }
                    })
            // check if the user is the creator
            response && (response.community?.creator === user._id ? setIsCreator(true) : setIsCreator(false))
        }
        getCommunity()
    }, [id, user._id])

    console.log(isMember, "isMembeeeeer")

    console.log(isCreator, "isCreattttoooooor")

    const handleJoinLeaveCommunity = () => {}

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
                                                    ? <span>{community
                                                                ?.members
                                                                    ?.length + 1}</span>
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
                                        <div>
                                            {community
                                                ?.creator
                                                    ?._id === user
                                                        ?._id
                                                            ? (
                                                                <button
                                                                    onClick={() => setShowAddMembersModal(true)}
                                                                    className="bg-primary text-white px-2 py-1.5 rounded-md">
                                                                    Add members
                                                                </button>
                                                            )
                                                            : (
                                                                <button
                                                                    onClick={handleJoinLeaveCommunity}
                                                                    className="bg-primary text-white px-2 py-1.5 rounded-md">
                                                                    {isMember
                                                                        ? "Leave community"
                                                                        : "Request to join"}
                                                                </button>
                                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <About data={community.description}/>
                    </div>
                    <div
                        className="flex-[5] bg-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3 h-fit max-h-[500px] overflow-scroll overflow-x-hidden scrollbar-hide">
                        {isCreator && <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <button className="w-full bg-primary text-white rounded-md py-1 text-lg font-medium">Invite users</button>
                                <button className="w-full bg-primary text-white rounded-md py-1 text-lg font-medium">Requested users</button>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="w-full bg-primary text-white rounded-md py-1 text-lg font-medium">Kick users</button>
                                <button className="w-full bg-primary text-white rounded-md py-1 text-lg font-medium">Delete community</button>
                            </div>
                        </div>}
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
            {showAddMembersModal && (<AddMembersModal setShowAddMembersModal={setShowAddMembersModal}/>)}
        </div>
    );
};

export default index;
