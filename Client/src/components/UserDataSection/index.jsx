import {useContext, useRef} from "react";
import {HiPencil} from "react-icons/hi";
import { AuthContext } from "../../Context/AuthContext";

const index = ({setShowEditUserModal}) => {

    const {user} = useContext(AuthContext);
    const {name, friends} = user;
    const {nickname, location} = user.profile;

    const coverPicRef = useRef();
    const profilePicRef = useRef();

    return (
        <div className="bg-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3">
            <div className="relative">
                <img
                    className="h-[200px] w-full object-cover rounded-md"
                    src="https://img.freepik.com/free-photo/landscape-lake-surrounded-by-mountains_23-2148215162.jpg?w=1060&t=st=1693667013~exp=1693667613~hmac=cbe76fdbc4c315a22be9518049b4ce73ba01a29d7839bc73212e6627c7fe2bd3"
                    alt="cover-picture"/>
                <img
                    onClick={() => profilePicRef.current.click()}
                    className="absolute w-[160px] h-[160px] rounded-full object-cover -bottom-[25%] left-[5%] border-[5px] border-white cursor-pointer"
                    src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                    alt="profile-picture"/>
                <input ref={profilePicRef} type="file" className="hidden"/>
                <div
                    onClick={() => coverPicRef.current.click()}
                    className="absolute w-[30px] h-[30px] flex items-center justify-center bg-white rounded-full top-2 right-2 cursor-pointer">
                    <HiPencil className="text-primary" size={25}/>
                    <input ref={coverPicRef} type="file" className="hidden"/>
                </div>
            </div>
            <div>
                <div className={`flex justify-end`}>
                    <HiPencil
                        onClick={() => setShowEditUserModal(true)}
                        className="cursor-pointer"
                        size={30}/>
                </div>
                <div className="mt-8 flex flex-col gap-1.5">
                    <div className="text-xl font-semibold">{name}</div>
                    <div>{nickname}</div>
                    <div>{location}</div>
                    <div>{friends?.length > 0? friends?.length: "No"} Friends</div>
                    <div className="mt-2">
                        <button className="bg-primary text-white px-2 py-1 5 rounded-md">
                            Add friend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default index