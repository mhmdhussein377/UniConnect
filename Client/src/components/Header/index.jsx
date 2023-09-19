import Logo from "./../../assets/UniConnectLogo.png";
import SearchBar from "./../SearchBar";
import {MdLightMode} from "react-icons/md";
import {AiFillBell} from "react-icons/ai";
import {AiFillHome} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import Notifications from "./../Notifications";
import {Fragment, useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../Context/AuthContext";

const index = ({profile}) => {
    const {user} = useContext(AuthContext);
    const {username} = user;

    const [showNotifications,
        setShowNotifications] = useState(false);
    const [themeMode,
        setThemeMode] = useState("light")
    const notificationsRef = useRef(null);
    const bellIconRef = useRef(null);
    const navigate = useNavigate()

    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };

    const handleClickOutside = (e) => {
        if (notificationsRef.current && !notificationsRef.current.contains(e.target) && bellIconRef.current && !bellIconRef.current.contains(e.target)) {
            setShowNotifications(false);
        }
    };

    const handleBellClick = (event) => {
        event.stopPropagation();
        toggleNotifications();

        if (window.innerWidth < 740) {
            navigate("/notifications")
        }
    };

    const handleChangeThemeMode = () => {
        setThemeMode(themeMode === "light"
            ? 'dark'
            : "light")
    }

    useEffect(() => {
        if (themeMode === "dark") {
            document
                .documentElement
                .classList
                .add("dark")
        } else {
            document
                .documentElement
                .classList
                .remove("dark")
        }
    }, [themeMode])

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        if (window.innerWidth < 740) {
            setShowNotifications(false)
        }
    })

    console.log(themeMode)

    // useEffect(() => {     if (localStorage.theme === "dark" || (!("theme" in
    // localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches))
    // {         document             .documentElement             .classList
    // .add("dark");     } else {         document             .documentElement
    //        .classList             .remove("dark");     } }, [themeMode])

    return (
        <div
            className="h-[70px] flex items-center justify-between px-4 py-2 border-b-[2px] border-b-grayHard dark:bg-black dark:border-b-white">
            <Link to="/home" className="flex-[3.2] flex items-center gap-8">
                <img className="w-[48px] h-[45px] object-cover" src={Logo} alt="logo"/>
            </Link>
            <div
                className="flex-[8.8] flex items-center justify-end sm:justify-between lg:pl-14">
                <div className="w-[60%] hidden sm:flex items-center gap-4">
                    {profile && (
                        <Link
                            to="/home"
                            className="flex flex-col items-center cursor-pointer dark:text-white">
                            <AiFillHome size={25}/>
                            Home
                        </Link>
                    )}
                    <SearchBar/>
                </div>
                <div className="flex items-center gap-2.5">
                    <MdLightMode
                        onClick={handleChangeThemeMode}
                        size={28}
                        className="cursor-pointer text-[#575D65] dark:text-white"/>
                    <div className="relative w-fit flex items-center justify-center">
                        <div
                            className="cursor-pointer select-none bell"
                            ref={bellIconRef}
                            onClick={handleBellClick}>
                            <AiFillBell size={28} className="text-[#575D65] dark:text-white"/>
                        </div>
                        {showNotifications && (
                            <Fragment>
                                <div ref={notificationsRef}>
                                    <div className="max-[740px]:hidden">
                                        <Notifications/>
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
