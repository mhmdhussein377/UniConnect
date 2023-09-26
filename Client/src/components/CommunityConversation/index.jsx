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
import { v4 } from "uuid";

const index = ({setOpenCommunityDetails, setShowAddMembersModal, setOpenSidebar, communityInfo, setNewGroupMessage}) => {
    const {user} = useContext(AuthContext);
    const socket = useRef();

    const [messageInput,
        setMessageInput] = useState("");
    const [messages,
        setMessages] = useState([]);
    const [arrivalMessage,
        setArrivalMessage] = useState({});

    useEffect(() => {
        setMessages(communityInfo?.chat);
    }, [communityInfo?.chat]);

    useEffect(() => {
        if (communityInfo?._id) {
            socket
                .current
                .emit("joinRoom", communityInfo?._id);
        }
    }, [communityInfo]);

    useEffect(() => {
        const displayedMessages = new Set();
        socket.current = io("http://localhost:3001");
        socket
            .current
            .on("getGroupMessage", ({sender, senderName, content}) => {
                // const messageId = `${sender}-${content}`;
                const messageId = `${v4()}`
                const data = {
                    sender: {
                        _id: sender,
                        name: senderName
                    },
                    content: content,
                    isRead: false,
                    createdAt: format(Date.now())
                };
                if (!displayedMessages.has(messageId)) {
                    displayedMessages.add(messageId);
                    setArrivalMessage(data);
                }
            });
    }, []);

    useEffect(() => {
        if (arrivalMessage && communityInfo) {
            setMessages((prevMessages) => [
                ...prevMessages,
                arrivalMessage
            ]);
        }
    }, [arrivalMessage, communityInfo]);

    let onlineUsers = communityInfo
        ?.members
            .reduce((count, member) => {
                if (member.online) {
                    return count + 1;
                }
                return count;
            }, 0);
    if (communityInfo?.creator.online) {
        onlineUsers += 1;
    }

    const handleSendMessage = async(e) => {
        e.preventDefault();

        const message = {
            content: messageInput
                .toString()
                .trim()
        };

        const groupMessage = {
            sender: user._id,
            senderName: user.name,
            content: messageInput
                .toString()
                .trim(),
            roomName: communityInfo._id
        };
        await postRequest(`/community/${communityInfo._id}/add-message`, message);
        socket
            .current
            .emit("sendGroupMessage", groupMessage);
        setNewGroupMessage(message);
        setMessageInput("");
    };

    return !communityInfo
        ? (
            <div className="flex-[8.8] flex flex-col">
                <div
                    className="grow h-full p-8 flex flex-col bg-gray-100 opacity-50 items-center justify-center">
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
                            onClick={() => setOpenCommunityDetails((prev) => !prev)}
                            className="flex items-center gap-2 font-medium text-lg rounded-md px-2 py-1 cursor-pointer transition bg-gray-200 hover:bg-gray-300 select-none">
                            {communityInfo.privacy === "public"
                                ? (<BsHash size={25}/>)
                                : (<AiTwotoneLock size={25}/>)}
                            {communityInfo.name}
                        </div>
                        <div className="flex items-center">
                            <span className="">{communityInfo?.members.length + 1}
                                member</span>
                            <span>
                                <BsDot size={25}/>
                            </span>
                            <span className="text-[#007D76] font-medium">
                                {onlineUsers}
                                online
                            </span>
                        </div>
                    </div>
                    <CgSidebarOpen
                        onClick={() => setOpenSidebar((prev) => !prev)}
                        className="lg:hidden"
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
                            onClick={() => setShowAddMembersModal(true)}
                            className="py-3 px-4 text-2xl border-2 border-[#CECECE] rounded-md flex items-center gap-4 text-center">
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
                        className="flex-grow w-full bg-[#F4F3FC] max-h-full overflow-y-scroll scrollbar-hide px-6 py-2">
                        {messages
                            ?.map((message, index) => {
                                if (message.content) {
                                    return (<Message
                                        key={index}
                                        communitMessage={true}
                                        content={message.content}
                                        sender={message.sender?.name}
                                        own={message.sender?._id}
                                        date={format(Date.now())}/>);
                                }
                            })}
                    </div>
                )}
                {!communityInfo.members.length == 0 && (
                    <form
                        onSubmit={handleSendMessage}
                        className="w-full flex items-center px-6 py-5 bg-[#F4F3FC]">
                        <div
                            className="flex items-center gap-4 pr-4 flex-1 h-[50px] rounded-tl-md rounded-bl-md overflow-hidden bg-white ">
                            <input
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                className="flex-1 h-[100%] px-4 border-none outline-none bg-transparent placeholder:text-[#737373] placeholder:font-medium"
                                type="text"
                                placeholder="Send a message"/>
                            <GrAttachment className="cursor-pointer" size={25}/>
                            <BsEmojiSmile className="cursor-pointer" size={25}/>
                        </div>
                        <button
                            type="submit"
                            className="h-[50px] px-4 sm:px-10 py-2 bg-primary text-white rounded-tr-md rounded-br-md flex items-center justify-center gap-3 text-lg font-medium">
                            <BsFillSendFill size={20}/>
                            Send
                        </button>
                    </form>
                )}
            </div>
        );
};

export default index;
