import Logo from "./../../assets/UniConnectLogo.png";
import SearchBar from "./../../components/ui/SearchBar";
import {MdLightMode} from "react-icons/md";
import {AiFillBell} from "react-icons/ai";
import {useState} from "react";
import {AiFillHome} from "react-icons/ai";
import {Link} from "react-router-dom";

const index = ({profile}) => {

    return (
        <div
            className="h-[70px] flex items-center justify-between px-4 py-2 border-b-[2px] border-b-grayHard">
            <Link to="/home" className="flex-[3.2] flex items-center gap-8">
                <img className="w-[48px] h-[45px] object-cover" src={Logo} alt="logo"/>
            </Link>
            <div
                className="flex-[8.8] flex items-center justify-end sm:justify-between lg:pl-14">
                <div className="w-[60%] hidden sm:flex items-center gap-4">
                    {profile && (
                        <Link to="/home" className="flex flex-col items-center cursor-pointer">
                            <AiFillHome size={25}/>
                            Home
                        </Link>
                    )}
                    <SearchBar/>
                </div>
                <div className="flex items-center gap-2.5">
                    <MdLightMode size={28} color="#575D65"/>
                    <div className="relative w-fit flex items-center justify-center">
                        <AiFillBell
                            className="cursor-pointer select-none"
                            size={28}
                            color="#575D65"/>{" "}
                    </div>
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                            alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;
