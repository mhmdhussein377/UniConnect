import {useContext, useEffect, useRef, useState} from "react";
import {HiPencil} from "react-icons/hi";
import {getRequest, postRequest} from "../../utils/requests";
import {AuthContext} from "../../Context/AuthContext";

const index = ({setShowEditUserModal, user, isCurrentUser}) => {

    const {user: currentUser} = useContext(AuthContext)

    let [friendship,
        setFriendship] = useState({});
    let [friendshipStatus,
        setFriendshipStatus] = useState({status: "", requester: ""});
    let [buttonText,
        setButtonText] = useState("")
    const [loading,
        setLoading] = useState(false);
    const coverPicRef = useRef();
    const profilePicRef = useRef();

    useEffect(() => {
        const getFrienship = async() => {
            const response = await getRequest(`/friendship/${user.username}`);
            let friendship = response.friendship[0];
            setFriendship(friendship);

            if (friendship) {
                setFriendshipStatus({requester: friendship.requester, status: friendship.status});
            } else {
                setFriendshipStatus({requester: "", status: "no friendship"});
            }
        };
        getFrienship();
    }, [user])

    useEffect(() => {
        if (friendshipStatus
            ?.status === "no friendship") {
            setButtonText("Add friend")
        } else if (friendshipStatus
            ?.status === "pending" && friendshipStatus
                ?.requester === currentUser._id) {
            setButtonText("Cancel friend request")
        } else if (friendshipStatus
            ?.status === "pending" && friendshipStatus
                ?.requester !== currentUser._id) {
            setButtonText("Accept friend request")
        } else if (friendshipStatus
            ?.status === "accepted") {
            setButtonText("Remove friend")
        } else if (friendshipStatus
            ?.status === "rejected") {
            setButtonText("Add friend")
        }
    }, [
        friendship
            ?.status,
        currentUser._id,
        friendshipStatus.requester,
        friendshipStatus.status
    ])

    const handleAddRemoveFriend = async() => {
        setLoading(true)
        try {
            if (friendshipStatus.status === "no friendship") {
                setFriendshipStatus({status: "pending", requester: currentUser._id});
                const response = await postRequest(`/friendship/send-friend-request/${user
                    ?._id}`);
                console.log(response);
            } else if (friendshipStatus.status === "pending" && friendshipStatus.requester === currentUser._id) {
                setFriendshipStatus({status: "no friendship", requester: ""});
                const response = await postRequest(`/friendship/cancel-friend-request/${user
                    ?._id}`);
                console.log(response);
            } else if (friendshipStatus.status === "pending" && friendshipStatus.requester !== currentUser._id) {
                setFriendshipStatus({status: "accepted", requester: ""});
                const response = await postRequest(`/friendship/accept-friend-request/${user
                    ?._id}`);
                console.log(response);
            } else if (friendshipStatus.status === "accepted") {
                setFriendshipStatus({status: "no friendship", requester: ""});
                const response = await postRequest(`/friendship/unfriend/${user
                    ?._id}`);
                console.log(response);
            } else if (friendshipStatus.status === "rejected") {
                setFriendshipStatus({status: "pending", requester: currentUser._id});
                const response = await postRequest(`/friendship/send-friend-request/${user
                    ?._id}`);
                console.log(response);
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className="bg-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3">
            <div className="relative">
                <img
                    className="h-[200px] w-full object-cover rounded-md"
                    src="https://img.freepik.com/free-photo/landscape-lake-surrounded-by-mountains_23-2148215162.jpg?w=1060&t=st=1693667013~exp=1693667613~hmac=cbe76fdbc4c315a22be9518049b4ce73ba01a29d7839bc73212e6627c7fe2bd3"
                    alt="cover-picture"/>
                <img
                    onClick={() => isCurrentUser && profilePicRef.current.click()}
                    className={`absolute w-[160px] h-[160px] rounded-full object-cover -bottom-[25%] left-[5%] border-[5px] border-white ${isCurrentUser && "cursor-pointer"}`}
                    src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                    alt="profile-picture"/>
                <input ref={profilePicRef} type="file" className="hidden"/> {isCurrentUser && <div
                    onClick={() => coverPicRef.current.click()}
                    className="absolute w-[30px] h-[30px] flex items-center justify-center bg-white rounded-full top-2 right-2 cursor-pointer">
                    <HiPencil className="text-primary" size={25}/>
                    <input ref={coverPicRef} type="file" className="hidden"/>
                </div>}
            </div>
            <div>
                <div
                    className={`flex justify-end ${isCurrentUser
                    ? "visible"
                    : "invisible"}`}>
                    <HiPencil
                        onClick={() => setShowEditUserModal(true)}
                        className="cursor-pointer"
                        size={30}/>
                </div>
                <div className="mt-8 flex flex-col gap-1.5">
                    <div className="text-xl font-semibold">{user
                            ?.name}</div>
                    {user
                        ?.profile
                            ?.nickname && <div>{user
                                    ?.profile
                                        ?.nickname}</div>}
                    {user
                        ?.profile
                            ?.location
                                ? <div>{user.profile.location}</div>
                                : null}
                    <div>{user.friends
                            ?.length > 0
                                ? user.friends
                                    ?.length
                                    : "No"}
                        Friends</div>
                    {!isCurrentUser && buttonText !== "" && <div className="mt-2">
                        <button
                            disabled={loading}
                            onClick={handleAddRemoveFriend}
                            className="bg-primary text-white px-2 py-1 5 rounded-md">
                            {buttonText}
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default index