import {Link} from "react-router-dom";
import ProfilePicture from "../../../assets/ProfilePicture.jpg"

const index = ({member, handleChange}) => {

    const {name, username, _id, profile} = member;
    
    return (
        <div className="flex items-center justify-center gap-2 cursor-pointer">
            <Link to={`/profile/${username}`} className="flex items-center gap-2 flex-1">
                <div
                    className="rounded-full flex items-center justify-center overflow-hidden w-[45px] h-[45px]">
                    <img
                        src={profile?.profileImage || ProfilePicture}
                        alt="profile-picture"/>
                </div>
                <div className="flex flex-col gap-0">
                    <div>{name}</div>
                    <p className="text-sm">{username}</p>
                </div>
            </Link>
            <div>
                <input
                    value={_id}
                    onChange={handleChange}
                    type="checkbox"
                    className="w-[20px] h-[20px] cursor-pointer"/>
            </div>
        </div>
    );
}

export default index