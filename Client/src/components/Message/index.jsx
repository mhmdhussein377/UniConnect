import {useContext} from "react";
import {AuthContext} from "../../Context/AuthContext";
import ProfilePicture from "./../../assets/ProfilePicture.jpg"

const index = ({
    own,
    content,
    sender,
    communitMessage,
    date,
    profilePicture
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
                    <img
                        className="rounded-tr-md rounded-tl-md max-h-[200px] object-cover"
                        src="https://img.freepik.com/free-photo/knights-canyon-challenge-dragon-digital-painting_456031-47.jpg?w=1060&t=st=1695646354~exp=1695646954~hmac=11bdee47a0d3dd37c23c38e753fa2cd57c9750569044c78db60eceef5dc66185"
                        alt="image"/>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
};

export default index;
