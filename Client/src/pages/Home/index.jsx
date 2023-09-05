import {useState} from "react";
import Header from "./../../components/Header"
import Sidebar from "./../../components/Sidebar"
import CommunityConversation from "./../../components/CommunityConversation"
import PrivateConversation from "./../../components/PrivateConversation"
import CommunityDetails from "./../../components/CommunityDetails"
import UserDetails from "./../../components/UserDetails"

const index = () => {

    let [type,
        setType] = useState("community");
    let [openCommunityDetails,
        setOpenCommunityDetails] = useState(false);
    let [showUserDetails,
        setShowUserDetails] = useState(false);

    return (
        <div className="h-screen max-h-screen">
            <Header/>
            <div className="flex relative home-bottom">
                <Sidebar setType={setType} type={type}/>{" "} {type === "community" && (<CommunityConversation setOpenCommunityDetails={setOpenCommunityDetails}/>)}
                {type === "inbox" && <PrivateConversation setShowUserDetails={setShowUserDetails}/>}
            </div>
            {/* Sidebar to show details about the community */}
            <CommunityDetails
                setOpenCommunityDetails={setOpenCommunityDetails}
                openCommunityDetails={openCommunityDetails}/> {/* Sidebar to show details of the user */}
            {<UserDetails
                showUserDetails={showUserDetails}
                setShowUserDetails={setShowUserDetails}/>}
        </div>
    );
}

export default index