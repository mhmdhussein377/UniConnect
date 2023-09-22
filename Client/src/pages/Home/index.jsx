/* eslint-disable react-hooks/rules-of-hooks */
import {useContext, useEffect, useState} from "react";
import Header from "./../../components/Header";
import Sidebar from "./../../components/Sidebar";
import CommunityConversation from "./../../components/CommunityConversation";
import PrivateConversation from "./../../components/PrivateConversation";
import CommunityDetails from "./../../components/CommunityDetails";
import UserDetails from "./../../components/UserDetails";
import CreateCommunityModal from "../../components/CreateCommunityModal";
import AddMembersModal from "./../../components/AddMembersModal";
import {getRequest, postRequest} from "../../utils/requests";
import {AuthContext} from "../../Context/AuthContext";

const index = () => {

    const {user} = useContext(AuthContext)

    const [type,
        setType] = useState("inbox");
    const [openSidebar,
        setOpenSidebar] = useState(false);
    const [openCommunityDetails,
        setOpenCommunityDetails] = useState(false);
    const [showUserDetails,
        setShowUserDetails] = useState(false);
    const [showCommunityModal,
        setShowCommunityModal] = useState(false);
    const [showAddMembersModal,
        setShowAddMembersModal] = useState(false);

    const [selectedConversation,
        setSelectedConversation] = useState(null)
    const [conversation,
        setConversation] = useState(null)
    const [friends,
        setFriends] = useState([])
    const [messages,
        setMessages] = useState([])
    const [communities,
        setCommunities] = useState([])
    const [communityId,
        setCommunityId] = useState()
    const [selectedCommunity,
        setSelectedCommunity] = useState(null)
    const [newMessage,
        setNewMessage] = useState({})

    useEffect(() => {
        window.addEventListener("popstate", (event) => {
            event.preventDefault();
        });

        return () => {
            window.removeEventListener("popstate", (event) => {
                event.preventDefault();
            });
        };
    }, []);

    useEffect(() => {
        const getPrivateConversations = async() => {
            try {
                const response = await getRequest(`/privateChat/privateConversationsDetails`);
                setFriends(response)
            } catch (error) {
                console.log(error)
            }
        }
        getPrivateConversations()
    }, [messages])

    useEffect(() => {
        const getCommunities = async() => {
            try {
                const response = await getRequest(`/community/communitiesDetails`)
                setCommunities(response)
            } catch (error) {
                console.log(error)
            }
        }
        getCommunities()
    }, [])

    useEffect(() => {
        const getCommunityInfo = async() => {
            try {
                const response = await getRequest(`/community/communityInfo/${communityId}`)
                setSelectedCommunity(response)
            } catch (error) {
                console.log(error)
            }
        }
        communityId && getCommunityInfo()
    }, [communityId])

    useEffect(() => {
        setConversation(selectedConversation)
    }, [selectedConversation])

    useEffect(() => {
        const getPrivateConversationMessages = async() => {
            const data = {
                userOne: user._id,
                userTwo: conversation.member._id
            }
            const response = await postRequest(`/privateChat/privateConversationsMessages`, data)
            setMessages(response)
        }
        getPrivateConversationMessages()
    }, [conversation, user._id, newMessage])

    return (
        <div className="h-screen max-h-screen">
            <Header/>
            <div className="flex relative home-bottom dark:bg-black dark:text-white">
                <Sidebar
                    setType={setType}
                    type={type}
                    openSidebar={openSidebar}
                    setSelectedConversation={setSelectedConversation}
                    selectedCommunity={setCommunityId}
                    privateConversations={friends}
                    communities={communities}
                    setShowCommunityModal={setShowCommunityModal}
                    setOpenCommunityDetails={setOpenCommunityDetails}
                    setShowUserDetails={setShowUserDetails}/> 
                {type === "community" && (<CommunityConversation
                    setOpenCommunityDetails={setOpenCommunityDetails}
                    setShowAddMembersModal={setShowAddMembersModal}
                    setOpenSidebar={setOpenSidebar}
                    communityConversation={selectedCommunity}/>)}
                {type === "inbox" && (<PrivateConversation
                    setOpenSidebar={setOpenSidebar}
                    setShowUserDetails={setShowUserDetails}
                    conversation={conversation}
                    messages={messages}
                    setNewMessage={setNewMessage}
                    setConversationMessages={setMessages}/>)}
            </div>
            {/* Sidebar to show details about the community */}
            <CommunityDetails
                community={selectedCommunity}
                setOpenCommunityDetails={setOpenCommunityDetails}
                openCommunityDetails={openCommunityDetails}
                setShowAddMembersModal={setShowAddMembersModal}/>{" "} {/* Sidebar to show details of the user */}
            <UserDetails
                conversation={conversation}
                showUserDetails={showUserDetails}
                setShowUserDetails={setShowUserDetails}/>
            {/* Modal to create communities */}
            {showCommunityModal && <CreateCommunityModal setShowCommunityModal={setShowCommunityModal}/>}
            {/* Modal to add members to communities */}
            {showAddMembersModal && (<AddMembersModal setShowAddMembersModal={setShowAddMembersModal}/>)}
        </div>
    );
};

export default index;
