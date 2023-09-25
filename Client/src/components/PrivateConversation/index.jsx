/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {GrAttachment} from "react-icons/gr";
import {BsEmojiSmile} from "react-icons/bs";
import {BsFillSendFill} from "react-icons/bs";
import {CgSidebarOpen} from "react-icons/cg";
import Message from "./../../components/Message";
import {useContext, useEffect, useState, useRef} from "react";
import {postRequest} from "./../../utils/requests";
import {AuthContext} from "./../../Context/AuthContext";
import {format} from "timeago.js";
import {io} from "socket.io-client";

const index = ({setOpenSidebar, setShowUserDetails, conversation, messages, setNewMessage,setConversationMessages}) => {

    const {user} = useContext(AuthContext);
    const socket = useRef();
    const chatRef = useRef();

    let [messageInput,
        setMessageInput] = useState("");
    const [arrivalMessage,
        setArrivalMessage] = useState({});

    const handleSendMessage = async(e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            receiver: conversation?.member._id,
            content: messageInput
                .toString()
                .trim()
        };
        await postRequest("/privateChat/newPrivateMessage", message);
        socket
            .current
            .emit("sendMessage", message);
        setNewMessage(message)
        setMessageInput("");
    };

    useEffect(() => {
        socket.current = io("http://localhost:3001")
        socket.current.on("getMessage", ({sender, content}) => {
            console.log("message received")
            const data = {
                sender: {
                    _id: sender
                },
                content,
            }
            setArrivalMessage(data)
        })
    }, [])

    useEffect(() => {
        socket
            .current
            .emit("addUser", user._id);
    }, []);

    useEffect(() => {
        if(arrivalMessage && conversation) {
            setConversationMessages(prevMessages => [...prevMessages, arrivalMessage])
        }
    }, [arrivalMessage])

    useEffect(() => {
        if(chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    }, [messages])

    console.log(messages, "messaaagesss")

    return !conversation
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
            <div className="flex-[8.8] flex flex-col">
                <div
                    className="flex items-center justify-between px-4 py-1.5 border-b-[2px] border-grayHard h-[75px]">
                    <div className="flex items-center gap-3">
                        <div
                            className="relative">
                            <img
                                onClick={() => setShowUserDetails((prev) => !prev)}
                                className="cursor-pointer w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center object-cover"
                                src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                                alt="profile-picture"/>
                            {conversation.member.online && <span className="absolute w-[15px] h-[15px] bg-[limegreen] rounded-full top-0 right-0 border-2 border-white"></span>}
                        </div>
                        <div>
                            <div
                                className="cursor-pointer text-lg font-medium"
                                onClick={() => setShowUserDetails((prev) => !prev)}>
                                {conversation.member.name}
                            </div>
                            <p>{conversation.member.username}</p>
                        </div>
                    </div>
                    <CgSidebarOpen
                        className="lg:hidden"
                        onClick={() => setOpenSidebar((prev) => !prev)}
                        size={30}/>
                </div>
                <div
                    ref={chatRef}
                    className="flex-1 px-6  flex flex-col bg-[#F4F3FC] dark:bg-black overflow-scroll max-h-[80vh] scrollbar-hide z-10 conversation">
                    {messages
                        ?.map((message) => {
                        const {_id, sender, content, timestamps} = message
                        return <Message
                            key={_id}
                            own={sender?._id}
                            content={content}
                            sender={sender?.name}
                            date={format(timestamps)}/>})}
                </div>
                <form
                    onSubmit={handleSendMessage}
                    className="flex items-center mt-auto px-3 sm:px-6 py-5 bg-[#F4F3FC] dark:bg-black/50">
                    <div
                        className="flex items-center gap-2 sm:gap-4 pr-2 sm:pr-4 flex-1 h-[50px] rounded-tl-md rounded-bl-md overflow-hidden bg-white">
                        <input
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className="flex-1 h-[100%] px-2 sm:px-4 border-none outline-none bg-transparent placeholder:text-[#737373] placeholder:font-medium "
                            type="text"
                            placeholder="Send a message"/>
                        <div className="flex items-center gap-3">
                            <GrAttachment size={25}/>
                            <BsEmojiSmile size={25}/>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="h-[50px] px-4 sm:px-10 py-2 bg-primary text-white rounded-tr-md rounded-br-md flex items-center justify-center gap-3 text-base sm:text-lg font-medium">
                        <BsFillSendFill size={20}/>
                        Send
                    </button>
                </form>
            </div>
        );
};

export default index;
