import {AuthContext} from "../../Context/AuthContext"
import {useContext} from "react";

const index = ({
    highlight,
    name,
    lastMessage,
    date,
    messageNum,
    sender
}) => {
    const {user} = useContext(AuthContext);

    return (
        <div
            className={`px-4 py-3 flex justify-between w-full cursor-pointer border-l-[3px] ${highlight && "bg-[#E4F0FA] border-l-primary"}`}>
            <div className="flex items-center gap-2">
                <div
                    className="w-[45px] h-[45px] rounded-full flex items-center justify-center overflow-hidden">
                    <img
                        src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                        alt=""/>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div className="font-medium text-[18px]">{name}</div>
                    <p className="text-sm text-[#737373] font-medium">{lastMessage}</p>
                </div>
            </div>
            <div className="flex flex-col items-end justify-center">
                <p className="text-[14px] text-[#737373]">{date}</p>
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
