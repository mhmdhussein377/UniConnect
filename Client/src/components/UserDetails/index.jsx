import {MdOutlineClose, MdEmail} from "react-icons/md";
import {RiGraduationCapFill} from "react-icons/ri";
import {BiSolidBuildingHouse} from "react-icons/bi";
import {FaLocationDot} from "react-icons/fa6";
import {Link} from "react-router-dom";
import UserDetail from "./../UserDetail"
import { useEffect, useState } from "react";

const index = ({showUserDetails, setShowUserDetails, conversation}) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(conversation?.member)
    }, [conversation])

    console.log(user, "userrrr")

    return (
        <div
            className={`absolute top-0 bg-white dark:bg-black dark:text-white community-details h-screen w-[80%] xs:w-[70%] sm:w-[55%] smd:w-[48%] md:w-[42%] lg:w-[35%] xl:w-[27%] z-50 transition-all duration-300 ease-linear border-l-[2px] ${showUserDetails
            ? "right-0"
            : "-left-full"}`}>
            <div className="pb-4 border-b-2 border-grayHard">
                <div className="flex items-center justify-end pr-4 py-4 pb-1 ">
                    <div>
                        <MdOutlineClose
                            onClick={() => setShowUserDetails((prev) => !prev)}
                            className="cursor-pointer"
                            size={30}/>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Link
                        to={`/profile/${user?.username}`}
                        className="w-[120px] h-[120px] rounded-full overflow-hidden flex items-center justify-center">
                        <img
                            className="cursor-pointer"
                            src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                            alt="profile-picture"/>
                    </Link>
                    <Link to={`/profile/${user?.username}`} className="text-2xl cursor-pointer">{user?.name}</Link>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
                {user?.email && <UserDetail
                    icon={<MdEmail size={20}/>}
                    label="Email"
                    value={user.email}/>}
                {user?.profile?.major && <UserDetail
                    icon={<RiGraduationCapFill size={20}/>}
                    label="Major"
                    value={user.profile.major}/>}
                {user?.profile?.university && <UserDetail
                    icon={<BiSolidBuildingHouse size={20} />}
                    label="University"
                    value={user.profile.university}/>}
                {user?.profile?.location && <UserDetail
                    icon={<FaLocationDot size={20}/>}
                    label="Location"
                    value={user.profile.location}/>}
            </div>
        </div>
    );
};

export default index;
