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
import {useLocation, useNavigate} from "react-router-dom";
import {format} from "timeago.js";
import {io} from "socket.io-client";

const index = ({setOpenSidebar, setShowUserDetails}) => {
    const {user} = useContext(AuthContext);
    const socket = useRef();
    let [messageInput,
        setMessageInput] = useState("");
    let [messages,
        setMessages] = useState([]);
    let [conversation,
        setConversation] = useState(null);
    const [arrivalMessage,
        setArrivalMessage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        socket.current = io("ws://localhost:3001")
        socket.current.emit("addUser", "user._id")
    }, [user._id])

    useEffect(() => {
        const getPrivateConversations = async() => {
            const data = {
                userOne: user._id,
                userTwo: conversation.member._id
            }
            const response = await postRequest(`/privateChat/privateConversationsMessagges`, data, true, null)
            setMessages(response)
            navigate('/home', {state: messages[messages.length - 1]})
        }
        getPrivateConversations()
    }, [conversation])

    const handleSendMessage = async(e) => {
        e.preventDefault()

        const message = {
            sender: user._id,
            receiver: conversation?.member._id,
            content: messageInput.toString().trim()
        }
        await postRequest("/privateChat/newPrivateMessage", message, true, null)
        socket.current.emit("sendMessage", message)
        setMessageInput("")
    }

    //////////////////////////////////////////////////////////////

    useEffect(() => {
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                content: data.text,
                isRead: false,
                createdAt: format(Date.now())
            })
        })
    }, [])

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
                            className="w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center">
                            <img
                                onClick={() => setShowUserDetails((prev) => !prev)}
                                className="cursor-pointer"
                                src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                                alt="profile-picture"/>
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
                    className="flex-1 px-6  flex flex-col bg-[#F4F3FC] overflow-scroll max-h-[80vh] scrollbar-hide z-10 conversation">
                    {messages
                        ?.map((message) => (<div>Message</div>))}
                </div>
                <form
                    onSubmit={handleSendMessage}
                    className="flex items-center mt-auto h-[70px] px-6  bg-[#F4F3FC]">
                    <div
                        className="flex items-center gap-4 pr-4 flex-1 h-[50px] rounded-tl-md rounded-bl-md overflow-hidden bg-white">
                        <input
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className="flex-1 h-[100%] px-4 border-none outline-none bg-transparent placeholder:text-[#737373] placeholder:font-medium"
                            type="text"
                            placeholder="Send a message"/>
                        <GrAttachment size={25}/>
                        <BsEmojiSmile size={25}/>
                    </div>
                    <button
                        type="submit"
                        className="h-[50px] px-10 py-2 bg-primary text-white rounded-tr-md rounded-br-md flex items-center justify-center gap-3 text-lg font-medium">
                        <BsFillSendFill size={20}/>
                        Send
                    </button>
                </form>
            </div>
        );
};

export default index;
