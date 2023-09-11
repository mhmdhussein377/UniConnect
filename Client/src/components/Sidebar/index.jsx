import {MdEmail} from "react-icons/md";
import {BsThreeDots} from "react-icons/bs";
import {AiOutlinePlus, AiOutlineUser, AiFillHome} from "react-icons/ai";
import {BiLogOut} from "react-icons/bi"
import {RiCommunityFill} from "react-icons/ri";
import {FaUserPlus} from "react-icons/fa"
import {Link, useNavigate} from "react-router-dom";
import {Fragment, useContext, useEffect, useRef, useState} from "react";
import Friend from "./../Friend"
import Community from "./../Community"
import {AuthContext} from "../../Context/AuthContext";

const index = ({type, setType, setShowCommunityModal}) => {

    const {user} = useContext(AuthContext);
    const {name, username} = user

    let [showSettings,
        setShowSettings] = useState(false)
    const navigate = useNavigate()
    const dotsRef = useRef()
    const settingsRef = useRef()

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("user")

        navigate("/")
    }

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

    let [friends,
        setFriends] = useState([ < Friend highlight = {
            true
        } />, < Friend />
    ]);
    let [communities,
        setCommunities] = useState([< Community highlight = {
            true
        } />]);

    return (
        <div
            className={`w-[80%] sm:w-[65%] smd:w-[55%] md:w-[45%] flex flex-col h-full border-r-[2px] border-grayHard absolute top-0 -left-full sidebar transition-all duration-300 ease-linear lg:static lg:flex-[3.5] bg-white z-[20]`}>
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
                    className={`-mb-[1.5px] flex items-center gap-2 px-6 py-[22px] border-opacity-0 border-b-[3px] font-medium text-lg cursor-pointer border-transparent ${type === "inbox" && "border-opacity-100 border-b-primary text-primary"}`}>
                    <MdEmail size={25}/>
                    Inbox
                </div>
            </div>
            <div
                className="flex-grow w-full max-h-full overflow-y-scroll scrollbar-hide  bg-white">
                {type === "inbox" && (friends.length > 0
                    ? (friends.map((item) => item))
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
                    ? (communities.map((item) => item))
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
                className="border-t-[2px] flex items-center justify-between px-4 py-3 bg-white ">
                <div className="flex items-center gap-3 w-full">
                    <Link
                        to={`/profile/${username}`}
                        className="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center">
                        <img
                            src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                            alt="profile-picture"/>
                    </Link>
                    <div className="flex flex-col">
                        <div>
                            <Link to={`/profile/${username}`} className="text-lg font-semibold">
                                {name}
                            </Link>
                            <p className="text-[#737373] font-medium">{username}</p>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div ref={dotsRef} onClick={handleDotsClick}>
                        <BsThreeDots
                            className="cursor-pointer select-none"
                            size={30}/>
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
}

export default index