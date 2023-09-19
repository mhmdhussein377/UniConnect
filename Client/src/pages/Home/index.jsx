import {useEffect, useState} from "react";
import Header from "./../../components/Header";
import Sidebar from "./../../components/Sidebar";
import CommunityConversation from "./../../components/CommunityConversation";
import PrivateConversation from "./../../components/PrivateConversation";
import CommunityDetails from "./../../components/CommunityDetails";
import UserDetails from "./../../components/UserDetails";
import CreateCommunityModal from "../../components/CreateCommunityModal";
import AddMembersModal from "./../../components/AddMembersModal";
import {useNavigate} from "react-router-dom";

const index = () => {
    let [type,
        setType] = useState("inbox");
    let [openSidebar,
        setOpenSidebar] = useState(false);
    let [openCommunityDetails,
        setOpenCommunityDetails] = useState(false);
    let [showUserDetails,
        setShowUserDetails] = useState(false);
    let [showCommunityModal,
        setShowCommunityModal] = useState(false);
    let [showAddMembersModal,
        setShowAddMembersModal] = useState(false);

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

    return (
        <div className="h-screen max-h-screen">
            <Header/>
            <div className="flex relative home-bottom dark:bg-black dark:text-white">
                <Sidebar
                    setType={setType}
                    type={type}
                    openSidebar={openSidebar}
                    setShowCommunityModal={setShowCommunityModal}/>{" "} {type === "community" && (<CommunityConversation
                    setOpenCommunityDetails={setOpenCommunityDetails}
                    setShowAddMembersModal={setShowAddMembersModal}
                    setOpenSidebar={setOpenSidebar}/>)}
                {type === "inbox" && (<PrivateConversation
                    setOpenSidebar={setOpenSidebar}
                    setShowUserDetails={setShowUserDetails}/>)}
            </div>
            {/* Sidebar to show details about the community */}
            <CommunityDetails
                setOpenCommunityDetails={setOpenCommunityDetails}
                openCommunityDetails={openCommunityDetails}
                setShowAddMembersModal={setShowAddMembersModal}/>{" "} {/* Sidebar to show details of the user */}
            <UserDetails
                showUserDetails={showUserDetails}
                setShowUserDetails={setShowUserDetails}/>{" "} {/* Modal to create communities */}
            {showCommunityModal && (<CreateCommunityModal setShowCommunityModal={setShowCommunityModal}/>)}
            {/* Modal to add members to communities */}
            {showAddMembersModal && (<AddMembersModal setShowAddMembersModal={setShowAddMembersModal}/>)}
        </div>
    );
};

export default index;
