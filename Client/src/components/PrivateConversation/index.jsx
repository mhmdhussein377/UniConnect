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
import {RxHamburgerMenu} from "react-icons/rx"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"

const index = ({
    setOpenSidebar,
    setShowUserDetails,
    conversation,
    messages,
    setNewMessage,
    setConversationMessages,
    setSocketMessage,
    openSidebar
}) => {

    const {user} = useContext(AuthContext);
    // const socket = useRef(io("http://localhost:3001", {timeout: 60000}));
    const [socket,
        setSocket] = useState(null)
    const chatRef = useRef();
    const imgRef = useRef()

    // useEffect(() => {     // const handleSocketTimeout = () => {     //
    // console.error("WebSocket connection timed out");     // };     // socket //
    // .current     //     .on("connect_error", (error) => {     // if
    // (error.message === "timeout") {     //             handleSocketTimeout(); //
    //      } else {     //             console.error("WebSocket connection error:",
    // error);     //         }     //     });     return () => { if (socket.current
    // && socket.current.connected) {             socket .current           .close()
    //         }     } }, []); socket.current.on("disconnect", (reason) => {     if
    // (reason === "io server disconnect") { socket.connect();    } });

    const [messageInput,
        setMessageInput] = useState("");
    const [arrivalMessage,
        setArrivalMessage] = useState({});
    const [image,
        setImage] = useState(null)
    const [isPickerVisible,
        setisPickerVisible] = useState(false)
    const [currentEmoji,
        setCurrentEmoji] = useState(null)

    const hanldeImagetoBase64 = (image) => {
        return new Promise((resolve, reject) => {
            if (!image) {
                reject(new Error("Image is missing"));
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSendMessage = async(e) => {
        e.preventDefault();

        if (!image && !messageInput) {
            return
        }

        if (image && messageInput) {
            handleImageUpload(image).then(async(url) => {
                const message = {
                    sender: user._id,
                    receiver: conversation
                        ?.member._id,
                    content: messageInput
                        .toString()
                        .trim(),
                    fileURL: url
                };

                socket.emit("sendMessage", message);
                setNewMessage(message)
                setisPickerVisible(false)
                await postRequest("/privateChat/newPrivateMessage", message);
            })
        } else if (image && !messageInput) {
            hanldeImagetoBase64(image).then(async(base64) => {
                handleImageUpload(image).then(async(url) => {
                    const message = {
                        sender: user._id,
                        receiver: conversation
                            ?.member._id,
                        fileURL: url
                    };

                    const frontMessage = {
                        sender: user._id,
                        receiver: conversation
                            ?.member._id,
                        fileURL: base64
                    }

                    socket.emit("sendMessage", message);
                    setNewMessage(frontMessage);
                    setisPickerVisible(false);
                    await postRequest("/privateChat/newPrivateMessage", message);
                });
            })
        } else if (messageInput && !image) {
            console.log("hereeee")
            const message = {
                sender: user._id,
                receiver: conversation
                    ?.member._id,
                content: messageInput
                    .toString()
                    .trim()
            };

            console.log(message)

            setNewMessage(message)
            socket.emit("sendMessage", message);
            await postRequest("/privateChat/newPrivateMessage", message);
        }
        setisPickerVisible(false);
        setMessageInput("");
        setImage(null)
    };

    useEffect(() => {
        if (socket) {
            console.log("innnnn")
            socket.on("getMessage", ({sender, content, fileURL, receiver}) => {
                const data = {
                    sender: {
                        _id: sender
                    },
                    receiver
                }

                if (fileURL) {
                    data.fileURL = fileURL
                }
                if (content) {
                    data.content = content
                }

                setSocketMessage(data)
                setArrivalMessage(data)
            })

            socket.emit("addUser", user._id);
        }
    }, [socket])

    useEffect(() => {
        const socketIO = io("http://localhost:3001", {
            timeout: 60000,
            autoConnect: false
        });
        if (!socket) {
            socketIO.connect()
            setSocket(socketIO)
        }

        return () => {
            socketIO.disconnect()
        }
    }, [])

    // useEffect(() => {     socket         .emit("addUser", user._id); }, []);

    useEffect(() => {
        if (conversation && arrivalMessage && conversation
            ?.member
                ?._id === arrivalMessage
                    ?.sender
                        ?._id) {
            setConversationMessages(prevMessages => [
                ...prevMessages,
                arrivalMessage
            ])

            console.log("mhmdddd")
        }
    }, [arrivalMessage])

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    })

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

    useEffect(() => {
        if (currentEmoji) {
            setMessageInput(prev => prev + currentEmoji)
        }
    }, [currentEmoji])

    return !conversation
        ? (
            <div className="flex-[8.8] flex flex-col">
                <div
                    className={`bg-gray-100 w-full flex items-center ${openSidebar
                    ? "justify-end"
                    : "justify-start"} dark:bg-black opacity-50 p-4 lg:hidden`}>
                    <RxHamburgerMenu
                        onClick={() => setOpenSidebar(openSidebar
                        ? false
                        : true)}
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
                                        ?.profileImage || ProfilePicture}/>{" "} {conversation.member.online && (
                                <span
                                    className="absolute w-[15px] h-[15px] bg-[limegreen] rounded-full top-0 right-0 border-2 border-white"></span>
                            )}
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
                        className="lg:hidden cursor-pointer"
                        onClick={() => setOpenSidebar((prev) => !prev)}
                        size={30}/>
                </div>
                <div
                    ref={chatRef}
                    className="flex-1 px-6  flex flex-col bg-[#F4F3FC] dark:bg-black overflow-scroll max-h-[80vh] scrollbar-hide z-10 conversation relative">
                    {messages
                        ?.map((message) => {
                            const {_id, sender, content, fileURL, timestamps} = message;
                            return ((fileURL || content) && (<Message
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
                                date={format(timestamps)}/>));
                        })}
                </div>
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
                        className="flex items-center gap-2 sm:gap-4 pr-2 sm:pr-4 flex-1 h-[50px] rounded-tl-md rounded-bl-md overflow-hidden bg-white">
                        <input
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className="flex-1 h-[100%] px-2 sm:px-4 border-none outline-none bg-transparent placeholder:text-[#737373] placeholder:font-medium "
                            type="text"
                            placeholder="Send a message"/>
                        <div className="flex items-center gap-3">
                            <input
                                onChange={(e) => setImage(e.target.files[0])}
                                ref={imgRef}
                                type="file"
                                className="hidden"/>
                            <GrAttachment
                                onClick={() => imgRef.current.click()}
                                className="cursor-pointer"
                                size={25}/>
                            <BsEmojiSmile
                                onClick={() => setisPickerVisible(!isPickerVisible)}
                                className="cursor-pointer"
                                size={25}/>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="h-[50px] px-4 sm:px-10 py-2 bg-primary text-white rounded-tr-md rounded-br-md flex items-center justify-center gap-3 text-base sm:text-lg font-medium">
                        <BsFillSendFill size={20}/>
                        Send {image && "📷"}
                    </button>
                </form>
            </div>
        );
};

export default index;
