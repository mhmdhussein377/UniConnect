import {useContext} from "react";
import {AuthContext} from "../../Context/AuthContext";
import ProfilePicture from "./../../assets/ProfilePicture.jpg"

const index = ({
    own,
    content,
    sender,
    communitMessage,
    date,
    profilePicture,
    fileURL
}) => {
    const {user} = useContext(AuthContext);
    const mine = user._id === own;

    return (
        <div className={`flex gap-2 mt-4 ${mine && "justify-start flex-row-reverse"}`}>
            <div
                className="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center">
                <img src={profilePicture || ProfilePicture} alt="profile-picture"/>
            </div>
            <div className="flex flex-col max-w-[60%]">
                <div
                    className={`w-full flex items-center justify-between gap-1.5 ${mine && "flex-row-reverse"}`}>
                    {communitMessage && !mine && <div className="font-medium text-[14px]">{sender}</div>}
                    {!communitMessage && <div></div>}
                    {!communitMessage && <div className={`text-[14px]`}>{date}</div>}
                </div>
                <div
                    className={`flex flex-col px-2 py-2 rounded-md max-w-full break-all ${mine
                    ? "rounded-tr-none bg-primary text-white"
                    : "rounded-tl-none bg-white text-primary"}`}>
                    {fileURL && <img
                        className="rounded-tr-md rounded-tl-md max-h-[200px] object-cover"
                        src={fileURL}
                        alt="image"/>}
                    {content && <p className={`${fileURL && "mt-1"} mb-[3px]`}>{content}</p>}
                    {communitMessage && <div className={`text-[12px] opacity-90`}>{date}</div>}
                </div>
            </div>
        </div>
    );
};

export default index;
