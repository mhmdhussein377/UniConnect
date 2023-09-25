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
import ProfilePicture from "./../../assets/ProfilePicture.jpg"
import {imageDB} from "../../utils/FirebaseConfig";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";

const index = ({
    setOpenSidebar,
    setShowUserDetails,
    conversation,
    messages,
    setNewMessage,
    setConversationMessages
}) => {

    const {user} = useContext(AuthContext);
    const socket = useRef();
    const chatRef = useRef();
    const imgRef = useRef()

    const [messageInput,
        setMessageInput] = useState("");
    const [arrivalMessage,
        setArrivalMessage] = useState({});
    const [image,
        setImage] = useState(null)

    const handleSendMessage = async(e) => {
        e.preventDefault();

        if (image) {
            handleImageUpload(image).then(async(url) => {
                const message = {
                    sender: user._id,
                    receiver: conversation?.member._id,
                    content: messageInput.toString().trim(),
                    fileURL: url
                };

                await postRequest("/privateChat/newPrivateMessage", message);
                socket.current.emit("sendMessage", message);
            })
        }else {
            const message = {
                sender: user._id,
                receiver: conversation?.member._id,
                content: messageInput.toString().trim(),
            };
            await postRequest("/privateChat/newPrivateMessage", message);
            socket.current.emit("sendMessage", message);
            setNewMessage(message)
        }
        setMessageInput("");
    };

    useEffect(() => {
        socket.current = io("http://localhost:3001")
        socket
            .current
            .on("getMessage", ({sender, content}) => {
                const data = {
                    sender: {
                        _id: sender
                    },
                    content
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
        if (arrivalMessage && conversation) {
            setConversationMessages(prevMessages => [
                ...prevMessages,
                arrivalMessage
            ])
        }
    }, [arrivalMessage])

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    }, [messages])

    const handleImageUpload = async(image) => {
        if (image) {
            try {
                const imgRef = ref(imageDB, `files/${v4()}`);
                const snapshot = await uploadBytes(imgRef, image)
                const downloadURL = await getDownloadURL(snapshot.ref)
                return downloadURL
            } catch (error) {
                console.log(`Error uploading image: `, error)
            }
        }
    }

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
                        <div className="relative">
                            <img
                                onClick={() => setShowUserDetails((prev) => !prev)}
                                className="cursor-pointer w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center object-cover"
                                src={conversation
                                ?.member
                                    ?.profile
                                        ?.profileImage || ProfilePicture}/> {conversation.member.online && <span
                                className="absolute w-[15px] h-[15px] bg-[limegreen] rounded-full top-0 right-0 border-2 border-white"></span>}
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
                            const {_id, sender, content, fileURL, timestamps} = message
                            return <Message
                                key={_id}
                                own={sender
                                ?._id}
                                content={content}
                                sender={sender
                                ?.name}
                                profilePicture={sender
                                ?.profile
                                    ?.profileImage}
                                fileURL={fileURL}
                                date={format(timestamps)}/>
                        })}
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
                            <input
                                onChange={e => setImage(e.target.files[0])}
                                ref={imgRef}
                                type="file"
                                className="hidden"/>
                            <GrAttachment
                                onClick={() => imgRef.current.click()}
                                className="cursor-pointer"
                                size={25}/>
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
