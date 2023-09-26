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
    const [newGroupMessage, setNewGroupMessage] = useState([])

    const [socketMessage, setSocketMessage] = useState({})

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
            const response = await getRequest(`/privateChat/privateConversationsDetails`);
            response && response.sort((conv1, conv2) => {
                const timestamp1 = new Date(conv1.lastMessage?.createdAt).getTime()
                const timestamp2 = new Date(conv2.lastMessage?.createdAt).getTime()

                return timestamp2 - timestamp1
            })
            setFriends(response)
        }
        getPrivateConversations()
    }, [messages, socketMessage])

    useEffect(() => {
        const getCommunities = async() => {
            const response = await getRequest(`/community/communitiesDetails`)
            setCommunities(response)
        }
        getCommunities()
    }, [])

    useEffect(() => {
        const getCommunityInfo = async() => {
            const response = await getRequest(`/community/communityInfo/${communityId}`)
            setSelectedCommunity(response)
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
            const response = await postRequest(`/privateChat/privateConversationMessages`, data)
            setMessages(response)
        }
        getPrivateConversationMessages()
    }, [conversation, user._id, newMessage])

    return (
      <div className="h-screen max-h-screen">
        <Header />
        <div className="flex relative home-bottom dark:bg-black dark:text-white">
          <Sidebar
            setType={setType}
            type={type}
            openSidebar={openSidebar}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            setCommunityId={setCommunityId}
            selectedCommunity={selectedCommunity}
            privateConversations={friends}
            communities={communities}
            setShowCommunityModal={setShowCommunityModal}
            setOpenCommunityDetails={setOpenCommunityDetails}
            setShowUserDetails={setShowUserDetails}
          />
          {type === "community" && (
            <CommunityConversation
              setOpenCommunityDetails={setOpenCommunityDetails}
              setShowAddMembersModal={setShowAddMembersModal}
              setOpenSidebar={setOpenSidebar}
              communityInfo={selectedCommunity}
              setNewGroupMessage={setNewGroupMessage}
            />
          )}
          {type === "inbox" && (
            <PrivateConversation
              setSocketMessage={setSocketMessage}
              setOpenSidebar={setOpenSidebar}
              setShowUserDetails={setShowUserDetails}
              conversation={conversation}
              messages={messages}
              setNewMessage={setNewMessage}
              setConversationMessages={setMessages}
            />
          )}
        </div>
        {/* Sidebar to show details about the community */}
        <CommunityDetails
          community={selectedCommunity}
          setOpenCommunityDetails={setOpenCommunityDetails}
          openCommunityDetails={openCommunityDetails}
          setShowAddMembersModal={setShowAddMembersModal}
        />{" "}
        {/* Sidebar to show details of the user */}
        <UserDetails
          conversation={conversation}
          showUserDetails={showUserDetails}
          setShowUserDetails={setShowUserDetails}
        />{" "}
        {/* Modal to create communities */}
        {showCommunityModal && (
          <CreateCommunityModal
            setCommunities={setCommunities}
            setShowCommunityModal={setShowCommunityModal}
          />
        )}
        {/* Modal to add members to communities */}
        {showAddMembersModal && (
          <AddMembersModal
            communityId={communityId}
            setShowAddMembersModal={setShowAddMembersModal}
          />
        )}
      </div>
    );
};

export default index;
