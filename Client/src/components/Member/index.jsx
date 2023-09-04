import { useState } from "react";
import {AiOutlinePlus} from "react-icons/ai";
import {AiOutlineMinus} from "react-icons/ai";

const index = ({inModal, searched, isFollowed, onToggleIsFollowed}) => {

    let [isInvited,
        setIsInvited] = useState(false);

    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <div
                    className="rounded-full flex items-center justify-center overflow-hidden w-[45px] h-[45px]">
                    <img
                        src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                        alt="profile-picture"/>
                </div>
                <div className="flex flex-col gap-0">
                    <div>Mohammad Hussein</div>
                    <p className="text-sm">Computer Science</p>
                </div>
            </div>
            {inModal && (
                <div>
                    {isInvited
                        ? (
                            <button
                                className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium"
                                onClick={() => setIsInvited(false)}>
                                <AiOutlineMinus/>
                                Decline
                            </button>
                        )
                        : (
                            <button
                                className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium"
                                onClick={() => setIsInvited(true)}>
                                <AiOutlinePlus/>
                                Invite
                            </button>
                        )}
                </div>
            )}
            {searched && (
                <div>
                    {isFollowed
                        ? (
                            <button
                                onClick={onToggleIsFollowed}
                                className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium">
                                <AiOutlineMinus/>
                                Remove friend
                            </button>
                        )
                        : (
                            <button
                                onClick={onToggleIsFollowed}
                                className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium">
                                <AiOutlinePlus/>
                                Add friend
                            </button>
                        )}
                </div>
            )}
        </div>
    );
};

export default index;
