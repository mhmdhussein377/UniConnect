/* eslint-disable react-hooks/rules-of-hooks */
import {AiFillHome, AiOutlineUser} from "react-icons/ai";
import {MdEmail} from "react-icons/md";
import {BsThreeDots} from "react-icons/bs";
import {AiOutlinePlus} from "react-icons/ai";
import {RiCommunityFill} from "react-icons/ri";
import {Fragment, useContext, useEffect, useRef, useState} from "react";
import {FaUserPlus} from "react-icons/fa";
import {Link} from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";
import {postRequest} from "../../utils/requests";
import Friend from "./../Friend";
import Community from "./../Community";
import {useNavigate} from "react-router-dom";
import {io} from "socket.io-client";
import {BiLogOut} from "react-icons/bi";
import ProfileImage from "./../../assets/ProfilePicture.jpg"

const index = ({
    openSidebar,
    type,
    setType,
    setShowCommunityModal,
    setOpenCommunityDetails,
    setShowUserDetails,
    privateConversations,
    setSelectedConversation,
    setCommunityId,
    communities,
    selectedConversation,
    selectedCommunity
}) => {

    const {user} = useContext(AuthContext);
    const {username} = user
    const socket = useRef()
    const dotsRef = useRef();
    const settingsRef = useRef();
    const navigate = useNavigate();
    const [showSettings,
        setShowSettings] = useState(false)

    const handleSelectedConversation = async(index, ID) => {
        setSelectedConversation(privateConversations[index])
        const data = {
            userOne: user
                ?._id,
            userTwo: ID
        }
        await postRequest(`/privateChat/readPrivateMessage`, data)
    }

    const handleLogout = async() => {
        await postRequest("/logout", {userId: user._id});
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        socket.current = io("http://localhost:3001");
        socket
            .current
            .emit("disconnectUser", user._id);
        navigate("/");
    };

    const toggleNotifications = () => {
        setShowSettings((prev) => !prev);
    };

    const handleClickOutside = (e) => {
        if (settingsRef.current && !settingsRef.current.contains(e.target) && dotsRef.current && !dotsRef.current.contains(e.target)) {
            setShowSettings(false);
        }
    };

    const handleDotsClick = (event) => {
        event.stopPropagation();
        toggleNotifications();
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
    }, []);

    return (
        <div
            className={`w-[80%] sm:w-[65%] smd:w-[55%] md:w-[45%] flex flex-col h-full border-r-[2px] border-grayHard absolute top-0 -left-full sidebar ${openSidebar && "left-[0%]"} transition-all duration-300 ease-linear lg:static lg:flex-[3.5] bg-white z-[20] dark:bg-black dark:text-white`}>
            <div
                className="flex items-center justify-center px-4 border-b-[2px] border-grayHard">
                <div
                    onClick={() => setType("community")}
                    className={`-mb-[1.5px] flex items-center gap-2 px-6 py-[22px] border-opacity-0 border-b-[3px] font-medium text-lg cursor-pointer border-transparent ${type === "community" && "border-opacity-100 border-b-primary text-primary"}`}>
                    <AiFillHome size={25}/>
                    Communities
                </div>
                <div
                    onClick={() => setType("inbox")}
                    className={`-mb-[1.5px] flex items-center gap-2 px-6 py-[22px] border-opactiy-0 border-transparent border-b-[3px] font-medium text-lg cursor-pointer ${type === "inbox" && "text-primary border-b-primary border-opacity-100"}`}>
                    <MdEmail size={25}/>
                    Inbox
                </div>
            </div>
            <div
                className="flex-grow w-full max-h-full overflow-y-scroll scrollbar-hide  bg-white dark:bg-black">
                {type === "inbox" && (privateConversations
                    ?.length > 0
                        ? (privateConversations.map((conversation, index) => {
                            const {member, lastMessage, unreadMessages, _id} = conversation;
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                    handleSelectedConversation(index, member._id);
                                    setOpenCommunityDetails(false);
                                    setShowUserDetails(false);
                                }}>
                                    <Friend
                                        highlight={selectedConversation
                                        ?._id === _id}
                                        name={member.name}
                                        lastMessage={lastMessage}
                                        messageNum={unreadMessages}
                                        sender={member._id}
                                        profilePicture={member?.profile?.profileImage}/>
                                </div>
                            );
                        }))
                        : (
                            <div className="h-full flex gap-4 items-center justify-center p-4">
                                <div className="p-1.5 rounded-md bg-secondary bg-opacity-30">
                                    <FaUserPlus className="text-primary" size={45}/>
                                </div>
                                <h1 className="font-medium text-[22px]">
                                    Connect with Others to Expand Your Circle!
                                </h1>
                            </div>
                        ))}
                {type === "community" && (communities
                    ?.length > 0
                        ? (communities.map((community, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                    setCommunityId(community.ID);
                                    setOpenCommunityDetails(false);
                                    setShowUserDetails(false);
                                }}>
                                    <Community
                                        highlight={community.ID === selectedCommunity
                                        ?._id}
                                        {...community}/>
                                </div>
                            );
                        }))
                        : (
                            <div className="h-full flex gap-4 items-center justify-center p-4">
                                <div className="p-1.5 rounded-md bg-secondary bg-opacity-30">
                                    <RiCommunityFill className="text-primary" size={50}/>
                                </div>
                                <h1 className="font-medium text-[22px]">
                                    Explore New Communities to Connect With!
                                </h1>
                            </div>
                        ))}
            </div>
            {type === "community" && (
                <Fragment>
                    <div className="my-2"></div>
                    <div className="bg-transparent w-full px-4">
                        <button
                            onClick={() => {
                            setShowCommunityModal(true);
                            setShowUserDetails(false);
                            setOpenCommunityDetails(false);
                        }}
                            className="py-3 mb-3 bg-primary text-white rounded-md w-full flex items-center justify-center gap-2 font-medium">
                            <AiOutlinePlus size={22}/>
                            New Community
                        </button>
                    </div>
                </Fragment>
            )}
            <div
                className="border-t-[2px] flex items-center justify-between px-4 py-3 bg-white dark:bg-black">
                <div className="flex items-center gap-3 w-full">
                    <Link
                        to={`/profile/${username}`}
                        className="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center">
                        <img
                            src={user
                            ?.profile
                                ?.profileImage || ProfileImage}
                            alt="profile-picture"/>
                    </Link>
                    <div className="flex flex-col">
                        <Link to={`/profile/${username}`} className="text-lg font-semibold">
                            {user.name}
                        </Link>
                        <p className="text-[#737373] font-medium">{username}</p>
                    </div>
                </div>
                <div className="relative">
                    <div ref={dotsRef} onClick={handleDotsClick}>
                        <BsThreeDots className="cursor-pointer" size={30}/>
                    </div>
                    {showSettings
                        ? (
                            <div
                                ref={settingsRef}
                                className="absolute -top-[100px] right-0 p-2 rounded-md bg-white settings text-xl">
                                <Link
                                    to={`/profile/${username}`}
                                    className="pb-2 border-b-2 flex gap-2 items-center">
                                    <AiOutlineUser size={25}/>
                                    Profile
                                </Link>
                                <div
                                    onClick={handleLogout}
                                    className="pt-2 flex items-center gap-2 cursor-pointer">
                                    <BiLogOut size={25}/>
                                    Logout
                                </div>
                            </div>
                        )
                        : null}
                </div>
            </div>
        </div>
    );
};

export default index;
