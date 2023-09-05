import {useState} from "react";
import Header from "./../../components/Header"
import Sidebar from "./../../components/Sidebar"
import CommunityConversation from "./../../components/CommunityConversation"
import PrivateConversation from "./../../components/PrivateConversation"
import CommunityDetails from "./../../components/CommunityDetails"
import UserDetails from "./../../components/UserDetails"
import CreateCommunity from "./../../components/CreateCommunity"
import AddMembersModal from "./../../components/AddMembersModal"

const index = () => {

    let [type,
        setType] = useState("community");
    let [openCommunityDetails,
        setOpenCommunityDetails] = useState(false);
    let [showUserDetails,
        setShowUserDetails] = useState(false);
    let [showCommunityModal,
        setShowCommunityModal] = useState(false);
    let [showAddMembersModal, setShowAddMembersModal] = useState(false)

    return (
        <div className="h-screen max-h-screen">
            <Header/>
            <div className="flex relative home-bottom">
                <Sidebar setType={setType} type={type} setShowCommunityModal={setShowCommunityModal}/> 
                {type === "community" && (<CommunityConversation setOpenCommunityDetails={setOpenCommunityDetails}/>)}
                {type === "inbox" && (<PrivateConversation setShowUserDetails={setShowUserDetails}/>)}
            </div>
            {/* Sidebar to show details about the community */}
            <CommunityDetails
                setOpenCommunityDetails={setOpenCommunityDetails}
                openCommunityDetails={openCommunityDetails}
                setShowAddMembersModal={setShowAddMembersModal}/>
            {/* Sidebar to show details of the user */}
            <UserDetails
                showUserDetails={showUserDetails}
                setShowUserDetails={setShowUserDetails}/>
            {/* Modal to create communities */}
            {showCommunityModal && (<CreateCommunity setShowCommunityModal={setShowCommunityModal}/>)}
            {/* Modal to add members to communities */}
            {showAddMembersModal && <AddMembersModal setShowAddMembersModal={setShowAddMembersModal} />}
        </div>
    );
}

export default index