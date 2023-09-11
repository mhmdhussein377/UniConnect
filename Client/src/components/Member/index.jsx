import {useContext, useState} from "react";
import {AiOutlinePlus} from "react-icons/ai";
import {AiOutlineMinus} from "react-icons/ai";
import {AuthContext} from "../../Context/AuthContext";
import {Link} from "react-router-dom";

const index = ({searched, member, creator, invite}) => {

    const {user} = useContext(AuthContext)
    let [isInvited,
        setIsInvited] = useState(false)

    const {name, username, _id} = member

    let [isFollowed,
        setIsFollowed] = useState(user.friends.includes(_id))

    const actualUser = user._id === _id

    const handleInvite = () => {
        setIsInvited(!isInvited)

        if(isInvited) {
            console.log("invited")
        }else {
            console.log("not invited")
        }
    }

    return (
        <div
            className={`flex items-center justify-between gap-2 ${ !actualUser
            ? "cursor-pointer"
            : "cursor-auto"}`}>
            <Link
                to={!actualUser && `/profile/${username}`}
                className="flex items-center gap-2 flex-1">
                <div
                    className="rounded-full flex items-center justify-center overflow-hidden w-[45px] h-[45px]">
                    <img
                        src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                        alt="profile-picture"/>
                </div>
                <div className="flex flex-col gap-0">
                    <div>
                        {name}
                        {user._id === _id && "(You)"}
                        {creator && "(Creator)"}
                    </div>
                    <p className="text-sm">{username}</p>
                </div>
            </Link>
            {invite && (isInvited
                ? (
                    <button
                        onClick={handleInvite}
                        className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium">
                        <AiOutlineMinus/>
                        Cancel Invite
                    </button>
                )
                : (
                    <button
                        onClick={handleInvite}
                        className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium">
                        <AiOutlinePlus/>
                        Invite
                    </button>
                ))}
            {/* {withCheckbox
                ? (
                    <div>
                        <input checked={isChecked} onChange={handleAddUser} type="checkbox" className="w-[20px] h-[20px] cursor-pointer"/>
                    </div>
                )
                : null} */}
            {searched && !actualUser && (
                <div>
                    {isInvited
                        ? (
                            <button
                                className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium">
                                <AiOutlineMinus/>
                                Remove friend
                            </button>
                        )
                        : (
                            <button
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
