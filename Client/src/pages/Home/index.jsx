import {useState} from "react";
import Header from "./../../components/Header"
import Sidebar from "./../../components/Sidebar"
import CommunityConversation from "./../../components/CommunityConversation"
import PrivateConversation from "./../../components/PrivateConversation"
import CommunityDetails from "./../../components/CommunityDetails"
import UserDetails from "./../../components/UserDetails"
import CreateCommunity from "./../../components/CreateCommunity"

const index = () => {

    let [type,
        setType] = useState("community");
    let [openCommunityDetails,
        setOpenCommunityDetails] = useState(false);
    let [showUserDetails,
        setShowUserDetails] = useState(false);
    let [showCommunityModal,
        setShowCommunityModal] = useState(false);

    return (
        <div className="h-screen max-h-screen">
            <Header/>
            <div className="flex relative home-bottom">
                <Sidebar setType={setType} type={type} setShowCommunityModal={setShowCommunityModal}/> 
                {type === "community" && (<CommunityConversation setOpenCommunityDetails={setOpenCommunityDetails}/>)}
                {type === "inbox" && (<PrivateConversation setShowUserDetails={setShowUserDetails}/>)}
            </div>
            {/* Sidebar to show details about the community */}
            {openCommunityDetails && (<CommunityDetails
                setOpenCommunityDetails={setOpenCommunityDetails}
                openCommunityDetails={openCommunityDetails}/>)}
            {/* Sidebar to show details of the user */}
            {showUserDetails && (<UserDetails
                showUserDetails={showUserDetails}
                setShowUserDetails={setShowUserDetails}/>)}
            {/* Modal to create communities */}
            {showCommunityModal && (<CreateCommunity setShowCommunityModal={setShowCommunityModal}/>)}
        </div>
    );
}

export default index