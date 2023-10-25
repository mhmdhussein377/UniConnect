/* eslint-disable react-hooks/rules-of-hooks */
import {BsHash, BsDot, BsEmojiSmile, BsFillSendFill} from "react-icons/bs";
import {GrAttachment} from "react-icons/gr";
import {CgSidebarOpen} from "react-icons/cg";
import {FiUserPlus} from "react-icons/fi";
import {AiTwotoneLock} from "react-icons/ai";
import Message from "./../Message";
import {useContext, useEffect, useState, useRef} from "react";
import {AuthContext} from "../../Context/AuthContext";
import {postRequest} from "../../utils/requests";
import {format} from "timeago.js";
import {io} from "socket.io-client";
import {handleImageUpload} from "./../../utils/uploadImage"
import {RxHamburgerMenu} from "react-icons/rx";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const index = ({
    setOpenCommunityDetails,
    setShowAddMembersModal,
    setOpenSidebar,
    openSidebar,
    communityInfo,
    setNewGroupMessage,
    setGroupSocketMessage
}) => {
    const {user} = useContext(AuthContext);
    const socket = useRef(io("http://localhost:3001", {timeout: 60000}));
    const chatRef = useRef();
    const fileRef = useRef();

    socket
        .current
        .on("disconnect", (reason) => {
            if (reason === "io server disconnect") {
                socket.connect();
            }
        });

    useEffect(() => {
        // const handleSocketTimeout = () => {     console.error("WebSocket connection
        // timed out") } socket     .current     .on("connect_error", (error) => {   if
        // (error.message === "timeout") {             handleSocketTimeout()  } else {
        // console.error("WebSocket connection error:", error)     }     })

        return () => {
            if (socket.current && socket.current.connected) {
                socket
                    .current
                    .close();
            }
        };
    }, []);

    const [messageInput,
        setMessageInput] = useState("");
    const [messages,
        setMessages] = useState([]);
    const [arrivalMessage,
        setArrivalMessage] = useState(null);
    const [file,
        setFile] = useState(null);
    const [isPickerVisible,
        setisPickerVisible] = useState(false);
    const [currentEmoji,
        setCurrentEmoji] = useState(null);

    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    const toggleCommunityDetails = () => setOpenCommunityDetails((prev) => !prev);

    const showAddMembersModal = () => setShowAddMembersModal(true);

    const toggleEmojiPicker = () => setisPickerVisible(!isPickerVisible);

    const handleFileInputClick = () => fileRef.current.click();

    useEffect(() => {
        setMessages(communityInfo?.chat);
    }, [communityInfo?.chat]);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (communityInfo?._id) {
            socket.current.emit("joinRoom", communityInfo?._id);
        }
    }, [communityInfo]);

    useEffect(() => {
        socket
            .current
            .on("getGroupMessage", ({sender, senderName, content, fileURL, roomName}) => {
                let data = {};
                if (roomName === communityInfo
                    ?._id && communityInfo) {
                    data = {
                        sender: {
                            _id: sender,
                            name: senderName
                        },
                        fileURL,
                        content: content,
                        roomName,
                        createdAt: format(Date.now())
                    };
                }
                setArrivalMessage(data);
                setNewGroupMessage(data);
                setGroupSocketMessage(data);
            });
    }, [communityInfo]);

    useEffect(() => {
        if (arrivalMessage && communityInfo && communityInfo?._id && arrivalMessage?.roomName) {
            setMessages((prevMessages) => [
                ...prevMessages,
                arrivalMessage
            ]);
        }
        setArrivalMessage(null);
    }, [arrivalMessage, communityInfo, messages]);

    let onlineUsers = communityInfo?.members.reduce((count, member) => {
                if (member.online) {
                    return count + 1;
                }
                return count;
            }, 0);

    if (communityInfo
        ?.creator.online) {
        onlineUsers += 1;
    }

    const handleSendMessage = async(e) => {
        e.preventDefault();

        if (!file && !messageInput) 
            return;
        
        const trimmedMessageInput = messageInput
            ? messageInput.trim()
            : "";
        const sender = user._id;
        const senderName = user.name;
        const roomName = communityInfo._id;

        const message = {}
        const groupMessage = {
            sender,
            senderName,
            roomName
        }

        if (trimmedMessageInput) {
            message.content = trimmedMessageInput
            groupMessage.content = trimmedMessageInput
        }

        if (file) {
            const fileURL = await handleImageUpload(file)
            if (fileURL) {
                message.fileURL = fileURL
                groupMessage.fileURL = fileURL
            }
        }

        setMessageInput("");
        setisPickerVisible(false);
        setFile(null);
        setNewGroupMessage(message);
        socket
            .current
            .emit("sendGroupMessage", groupMessage);

        if (message.content || message.fileURL) {
            await postRequest(`/community/${roomName}/add-message`, message);
        }
    };

    useEffect(() => {
        if (currentEmoji) {
            setMessageInput((prev) => prev + currentEmoji);
        }
    }, [currentEmoji]);

    return !communityInfo
        ? (
            <div className="flex-[8.8] flex flex-col">
                <div
                    className={`bg-gray-100 w-full flex items-center ${openSidebar
                    ? "justify-end"
                    : "justify-start"} dark:bg-black opacity-50 p-4 lg:hidden`}>
                    <RxHamburgerMenu
                        onClick={toggleSidebar}
                        className="cursor-pointer"
                        size={35}/>
                </div>
                <div
                    className="grow h-full p-8 flex flex-col bg-gray-100 dark:bg-black dark:text-white opacity-50 items-center justify-center">
                    <span className="text-center text-2xl">
                        Open a Conversation to Start Chatting
                    </span>
                </div>
            </div>
        )
        : (
            <div className="flex-[8.8] flex flex-col h-full">
                <div
                    className="flex items-center justify-between px-4 py-1.5 border-b-[2px] border-grayHard">
                    <div className="flex flex-col items-center">
                        <div
                            onClick={toggleCommunityDetails}
                            className="flex items-center gap-2 font-medium text-lg rounded-md px-2 py-1 cursor-pointer transition bg-gray-200 hover:bg-gray-300 select-none dark:text-black">
                            {communityInfo.privacy === "public"
                                ? (<BsHash className="dark:text-black" size={25}/>)
                                : (<AiTwotoneLock className="dark:text-black" size={25}/>)}
                            {communityInfo.name}
                        </div>
                        <div className="flex items-center">
                            <span className="mr-1">{communityInfo?.members.length + 1}</span>
                            <span>member</span>
                            <span>
                                <BsDot size={25}/>
                            </span>
                            <span className="text-[#007D76] font-medium mr-1">
                                {onlineUsers}
                            </span>
                            <span className="text-[#007D76]">online</span>
                        </div>
                    </div>
                    <CgSidebarOpen
                        onClick={toggleSidebar}
                        className="lg:hidden cursor-pointer"
                        size={30}/>
                </div>
                {communityInfo.members.length == 0 && (
                    <div
                        className="h-full flex flex-col gap-6 items-center justify-center text-center">
                        <div className="text-center flex flex-col gap-2">
                            <h1 className="text-4xl font-semibold">
                                Great, You have a community already!
                            </h1>
                            <p className="text-xl text-[#3A4C58] font-medium">
                                Lets start with basics. What would you like to do first?
                            </p>
                        </div>
                        <div
                            onClick={showAddMembersModal}
                            className="py-3 px-4 text-2xl border-2 border-[#CECECE] rounded-md flex items-center gap-4 text-center cursor-pointer">
                            <div className="border-2 p-2 rounded-md bg-primary">
                                <FiUserPlus className="text-white" size={25}/>
                            </div>
                            Invite people to the community
                        </div>
                    </div>
                )}
                {!communityInfo.members.length == 0 && (
                    <div
                        ref={chatRef}
                        className="flex-1 px-6  flex flex-col bg-[#F4F3FC] dark:bg-black overflow-scroll max-h-[80vh] scrollbar-hide z-10 conversation relative">
                        {messages
                            ?.map((message, index) => {
                                return (<Message
                                    key={index}
                                    communitMessage={true}
                                    content={message.content}
                                    sender={message.sender?.name}
                                    own={message.sender?._id}
                                    fileURL={message.fileURL}
                                    date={format(message?.timestamps)}/>);
                            })}
                    </div>
                )}
                {!communityInfo.members.length == 0 && (
                    <form
                        onSubmit={handleSendMessage}
                        className={`flex items-end mt-auto px-3 sm:px-6 py-5 bg-[#F4F3FC] dark:bg-black/50 relative overflow-visible ${isPickerVisible && "h-[520px]"}`}>
                        <div
                            className={isPickerVisible
                            ? `block absolute top-[5px] right-6`
                            : "hidden"}>
                            <Picker
                                data={data}
                                previewPosition="none"
                                onEmojiSelect={(e) => {
                                setCurrentEmoji(e.native);
                            }}/>
                        </div>
                        <div
                            className="flex items-center gap-4 pr-4 flex-1 h-[50px] rounded-tl-md rounded-bl-md overflow-hidden bg-white ">
                            <input
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                className="flex-1 h-[100%] px-4 border-none outline-none bg-transparent placeholder:text-[#737373] placeholder:font-medium"
                                type="text"
                                placeholder="Send a message"/>
                            <input
                                onChange={e => setFile(e.target.files[0])}
                                ref={fileRef}
                                type="file"
                                className="hidden"/>
                            <GrAttachment
                                onClick={handleFileInputClick}
                                className="cursor-pointer"
                                size={25}/>
                            <BsEmojiSmile
                                onClick={toggleEmojiPicker}
                                className="cursor-pointer text-black"
                                size={25}/>
                        </div>
                        <button
                            type="submit"
                            className="h-[50px] px-4 sm:px-10 py-2 bg-primary text-white rounded-tr-md rounded-br-md flex items-center justify-center gap-3 text-lg font-medium">
                            <BsFillSendFill size={20}/>
                            Send {file && "📷"}
                        </button>
                    </form>
                )}
            </div>
        );
};

export default index;
