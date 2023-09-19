/* eslint-disable react-hooks/rules-of-hooks */
import {AiFillHome} from "react-icons/ai";
import {MdEmail} from "react-icons/md";
import {BsThreeDots} from "react-icons/bs";
import {AiOutlinePlus} from "react-icons/ai";
import {RiCommunityFill} from "react-icons/ri";
import {Fragment, useContext, useEffect, useState} from "react";
import {FaUserPlus} from "react-icons/fa";
import {Link} from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";
import {getRequest, postRequest} from "../../utils/requests";
import Friend from "./../Friend";
import Community from "./../Community";
import {format} from "timeago.js";
import {useNavigate, useLocation} from "react-router-dom";

const index = ({openSidebar, type, setType, setShowCommunityModal}) => {
    const {user} = useContext(AuthContext);
    const location = useLocation();

    let [friends,
        setFriends] = useState([]);
    let [communities,
        setCommunities] = useState([ < Community />, < Community highlight = {
            true
        } />
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        const getPrivateConversations = async() => {
            const response = await getRequest(`/privateChat/privateConversationsDetails`)
            setFriends(response)
        }
        getPrivateConversations()
    }, [location.state])

    const handleSelectedConversation = async(index, ID) => {
        localStorage.setItem("conversationData", JSON.stringify(friends[index]))
        navigate("/home", {state: friends[index]})
        const data = {
            userOne: user
                ?._id,
            userTwo: ID
        }
        await postRequest(`/privateChat/readPrivateMessage`, data, true, null)
    }

    

    console.log(localStorage.getItem("conversationData"))

    return (
        <div
            className={`w-[80%] sm:w-[65%] smd:w-[55%] md:w-[45%] flex flex-col h-full border-r-[2px] border-grayHard absolute top-0 -left-full sidebar ${openSidebar && "left-[0%]"} transition-all duration-300 ease-linear lg:static lg:flex-[3.5] bg-white z-[20] dark:bg-black dark:text-white`}>
            <div
                className="flex items-center justify-center px-4 border-b-[2px] border-grayHard">
                <div
                    onClick={(e) => setType("community")}
                    className={`-mb-[1.5px] flex items-center gap-2 px-6 py-[22px] border-opacity-0 border-b-[3px] font-medium text-lg cursor-pointer border-transparent ${type === "community" && "border-opacity-100 border-b-primary text-primary"}`}>
                    <AiFillHome size={25}/>
                    Communities
                </div>
                <div
                    onClick={(e) => setType("inbox")}
                    className={`-mb-[1.5px] flex items-center gap-2 px-6 py-[22px] border-opactiy-0 border-transparent border-b-[3px] font-medium text-lg cursor-pointer ${type === "inbox" && "text-primary border-b-primary border-opacity-100"}`}>
                    <MdEmail size={25}/>
                    Inbox
                </div>
            </div>
            <div
                className="flex-grow w-full max-h-full overflow-y-scroll scrollbar-hide  bg-white dark:bg-black">
                {type === "inbox" && (friends
                    ?.length > 0
                        ? (friends.map((item, index) => (
                            <div key={index} onClick={() => handleSelectedConversation(index, item.member._id)}>
                                <Friend
                                    name={item.member.name}
                                    lastMessage={item.lastMessage}
                                    messageNum={item.unreadMessages}
                                    sender={item.member._id}
                                    date={format(item.member.createdAt)}/>
                            </div>
                        )))
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
                {type === "community" && (communities.length > 0
                    ? (communities.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelectedConversation(index, item.member._id)}>
                            <Friend
                                name={item.member.name}
                                lastMessage={item.lastMessage}
                                messageNum={item.unreadMessages}
                                sender={item.member._id}
                                date={format(item.member.createdAt)}/>
                        </div>
                    )))
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
                            onClick={() => setShowCommunityModal(true)}
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
                        to={`/profile?username=${user.username}`}
                        className="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center">
                        <img
                            src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                            alt="profile-picture"/>
                    </Link>
                    <div className="flex flex-col">
                        <Link
                            to={`/profile?username=${user.username}`}
                            className="text-lg font-semibold">
                            {user.name}
                        </Link>
                        <p className="text-[#737373] font-medium">{user.username}</p>
                    </div>
                </div>
                <BsThreeDots className="cursor-pointer" size={30}/>
            </div>
        </div>
    );
};

export default index;
