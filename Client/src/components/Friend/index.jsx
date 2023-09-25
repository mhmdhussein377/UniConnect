import { format } from "timeago.js";
import {AuthContext} from "../../Context/AuthContext"
import {useContext} from "react";
import ProfilePicture from "./../../assets/ProfilePicture.jpg"

const index = ({
    highlight,
    name,
    lastMessage,
    messageNum,
    sender,
    profilePicture
}) => {
    const {user} = useContext(AuthContext);

    return (
        <div
            className={`px-4 py-3 flex justify-between gap-3 w-full cursor-pointer border-l-[3px] ${highlight && "bg-[#E4F0FA] border-l-primary"}`}>
            <div className="flex items-center gap-2 max-w-[250px]">
                <div
                    className="w-[45px] h-[45px] rounded-full flex items-center justify-center overflow-hidden">
                    <img
                        src={profilePicture || ProfilePicture}
                        alt=""/>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div className="font-medium text-[18px]">{name}</div>
                    <p
                        className="text-sm text-[#737373] font-medium w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {lastMessage?.content}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end justify-center min-w-[90px]">
                {lastMessage && <p className="text-[13px] text-[#737373]">{format(lastMessage?.createdAt)}</p>}
                {messageNum > 0 && user._id !== sender && (
                    <div
                        className="w-[20px] h-[20px] bg-primary rounded-full flex items-center justify-center text-white text-sm">
                        {messageNum}
                    </div>
                )}
            </div>
        </div>
    );
};

export default index;
