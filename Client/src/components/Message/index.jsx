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
                    className={`w-full flex items-center justify-between ${mine && "flex-row-reverse"}`}>
                    {communitMessage && <div className="font-medium">{sender}</div>}
                    {!communitMessage && <div></div>}
                    <div className={`text-[14px]`}>{date}</div>
                </div>
                <div
                    className={`flex flex-col gap-1 px-3 py-3 bg-primary text-white rounded-md max-w-full break-all ${mine
                    ? "rounded-tr-none"
                    : "rounded-tl-none"}`}>
                    {fileURL && <img
                        className="rounded-tr-md rounded-tl-md max-h-[200px] object-cover"
                        src={fileURL}
                        alt="image"/>}
                    {content && <p>{content}</p>}
                </div>
            </div>
        </div>
    );
};

export default index;
