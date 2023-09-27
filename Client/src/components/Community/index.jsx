import {BiHash} from "react-icons/bi";
import {AiTwotoneLock} from "react-icons/ai";
import {format} from "timeago.js";

const index = ({highlight, name, unreadCount, privacy, lastMessage}) => {
    return (
        <div
            className={`px-4 py-3 flex justify-between w-full cursor-pointer border-l-[3px] ${highlight && "bg-[#E4F0FA] border-l-primary"}`}>
            <div className="flex items-center gap-2">
                <div
                    className="w-[45px] h-[45px] rounded-full flex items-center justify-center overflow-hidden bg-grayHard bg-opacity-70">
                    {privacy === "public"
                        ? (<BiHash color="white" size={30}/>)
                        : (<AiTwotoneLock color="white" size={30}/>)}
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div className={`font-medium text-[18px] ${highlight && "text-primary"}`}>
                        {name}
                    </div>
                    <p className="text-[14px] text-[#737373]">{lastMessage
                            ?.content}</p>
                </div>
            </div>
            <div className="flex flex-col items-end justify-center">
                {lastMessage && (
                    <p className="text-[13px] text-[#737373]">
                        {format(lastMessage
                            ?.createdAt)}
                    </p>
                )}
                {unreadCount > 0 && (
                    <div
                        className="w-[20px] h-[20px] bg-primary rounded-full flex items-center justify-center text-white text-sm">
                        {unreadCount}
                    </div>
                )}
            </div>
        </div>
    );
};

export default index;
