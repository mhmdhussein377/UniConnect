import {useContext} from "react";
import {AuthContext} from "../../Context/AuthContext";
import ProfilePicture from "./../../assets/ProfilePicture.jpg"

const index = ({own, content, sender, communitMessage, date, profilePicture}) => {
    const {user} = useContext(AuthContext);
    const mine = user._id === own;

    return (
        <div className={`flex gap-2 mt-4 ${mine && "justify-start flex-row-reverse"}`}>
            <div
                className="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center">
                <img
                    src={profilePicture || ProfilePicture}
                    alt="profile-picture"/>
            </div>
            <div className="flex flex-col max-w-[60%]">
                <div
                    className={`w-full flex items-center justify-between ${mine && "flex-row-reverse"}`}>
                    {communitMessage && <div className="font-medium">{sender}</div>}
                    {!communitMessage && <div></div>}
                    <div className={`text-[14px]`}>{date}</div>
                </div>
                <div
                    className={`px-4 py-2 bg-primary text-white rounded-md max-w-full break-all ${mine
                    ? "rounded-tr-none"
                    : "rounded-tl-none"}`}>
                    {content}
                </div>
            </div>
        </div>
    );
};

export default index;
