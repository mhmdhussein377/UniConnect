import Logo from "./../../assets/UniConnectLogo.png";
import SearchBar from "./../SearchBar";
import {MdLightMode} from "react-icons/md";
import {AiOutlineSearch} from "react-icons/ai";
import {BsArrowLeft} from "react-icons/bs";
import {AiFillBell} from "react-icons/ai";
import {AiFillHome} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import Notifications from "./../Notifications";
import {Fragment, useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../Context/AuthContext";
import {getRequest, postRequest} from "../../utils/requests";
import {useQuery} from "react-query";

const index = ({profile}) => {
    const {user} = useContext(AuthContext);
    const {username} = user;

    const [showNotifications,
        setShowNotifications] = useState(false);
    const [showSearchSm,
        setShowSearchSm] = useState(false);
    const [themeMode,
        setThemeMode] = useState("light");
    const [notifications,
        setNotifications] = useState([]);
    const [unreadNotifications,
        setUnreadNotifications] = useState();

    const notificationsRef = useRef(null);
    const bellIconRef = useRef(null);
    const navigate = useNavigate();

    const getNotifications = async() => {
        const response = await getRequest("/notifications");
        response && setNotifications(response.notifications);
    };

    const {data, error, isLoading} = useQuery("myData", getNotifications, {refetchInterval: 3000});

    console.log(notifications, "notifications");

    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };

    const setNotificationsAsRead = async() => {
        try {
            setUnreadNotifications(0);
            let notificationsIds = notifications.map((notification) => notification._id);
            await postRequest("/notifications/updateNotificationsStatus", {notificationsIds});
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickOutside = (e) => {
        setNotificationsAsRead();

        if (notificationsRef.current && !notificationsRef.current.contains(e.target) && bellIconRef.current && !bellIconRef.current.contains(e.target)) {
            setShowNotifications(false);
        }
    };

    const handleBellClick = (event) => {
        event.stopPropagation();
        setNotificationsAsRead();
        toggleNotifications();

        if (window.innerWidth < 740) {
            navigate("/notifications");
        }
    };

    const handleChangeThemeMode = () => {
        setThemeMode(themeMode === "light"
            ? "dark"
            : "light");
        localStorage.setItem("theme", themeMode)
    };

    useEffect(() => {
        if (themeMode === "dark") {
            document
                .documentElement
                .classList
                .add("dark");
        } else {
            document
                .documentElement
                .classList
                .remove("dark");
        }
    }, [themeMode]);

    // useEffect(() => {     document.addEventListener("click", handleClickOutside);
    // }, []);

    useEffect(() => {
        if (window.innerWidth < 740) {
            setShowNotifications(false);
        }
    });

    useEffect(() => {
        const unreadNotifications = notifications.reduce((count, noti) => {
            if (!noti.isRead) {
                count += 1;
            }
            return count;
        }, 0);
        setUnreadNotifications(unreadNotifications);
    }, [notifications]);

    useEffect(() => {
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document
                .documentElement
                .classList
                .add("dark");
        } else {
            document
                .documentElement
                .classList
                .remove("dark");
        }
    }, [themeMode])

    return (
        <div
            className="h-[70px] flex items-center justify-between px-4 py-2 border-b-[2px] border-b-grayHard dark:bg-black dark:border-b-white">
            <Link
                to="/home"
                className={`flex-[3.2] flex items-center gap-8 ${showSearchSm && "hidden"}`}>
                <img className="w-[48px] h-[45px] object-cover" src={Logo} alt="logo"/>
            </Link>
            <div
                className={`flex-[8.8] flex items-center justify-end ${showSearchSm && "w-full"} sm:justify-between lg:pl-14`}>
                <div
                    className={`${showSearchSm && "w-full flex"} w-[60%] ${ !showSearchSm && "hidden"} sm:flex items-center gap-4`}>
                    {profile && (
                        <Link
                            to="/home"
                            className="flex flex-col items-center cursor-pointer dark:text-white">
                            <AiFillHome size={25}/>
                            Home
                        </Link>
                    )}
                    {showSearchSm && (<BsArrowLeft
                        onClick={() => setShowSearchSm(false)}
                        className="cursor-pointer"
                        size={30}/>)}
                    <SearchBar/>
                </div>
                <div className={`flex items-center gap-2.5 ${showSearchSm && "hidden"}`}>
                    <AiOutlineSearch
                        onClick={() => setShowSearchSm(true)}
                        size={26}
                        className="cursor-pointer sm:hidden text-[#575D65] dark:text-white"/>
                    <MdLightMode
                        onClick={handleChangeThemeMode}
                        size={28}
                        className="cursor-pointer text-[#575D65] dark:text-white"/>
                    <div className="relative w-fit flex items-center justify-center">
                        <div
                            className="cursor-pointer select-none bell relative"
                            ref={bellIconRef}
                            onClick={handleBellClick}>
                            <AiFillBell size={28} className="text-[#575D65] dark:text-white"/>
                        </div>
                        {unreadNotifications > 0
                            ? (
                                <div
                                    onClick={handleBellClick}
                                    className="absolute -top-[3px] -right-[2px] rounded-full w-[17px] h-[17px] bg-primary text-white flex items-center justify-center cursor-pointer">
                                    {unreadNotifications}
                                </div>
                            )
                            : null}
                        {showNotifications && (
                            <Fragment>
                                <div ref={notificationsRef}>
                                    <div className="max-[740px]:hidden">
                                        <Notifications
                                            notifications={notifications}
                                            setNotifications={setNotifications}/>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </div>
                    <Link
                        to={`/profile/${username}`}
                        className="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                            alt=""/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default index;
