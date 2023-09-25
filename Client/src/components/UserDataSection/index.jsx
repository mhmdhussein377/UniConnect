import {useContext, useEffect, useRef, useState} from "react";
import {HiPencil} from "react-icons/hi";
import {getRequest, postRequest} from "../../utils/requests";
import {AuthContext} from "../../Context/AuthContext";
import {imageDB} from "../../utils/FirebaseConfig";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {v4} from "uuid"

const index = ({setShowEditUserModal, user, isCurrentUser, setFriends, friends}) => {

    const {user: currentUser, dispatch} = useContext(AuthContext)

    const [friendship,
        setFriendship] = useState({});
    const [friendshipStatus,
        setFriendshipStatus] = useState({status: "", requester: ""});
    const [buttonText,
        setButtonText] = useState("")
    const [loading,
        setLoading] = useState(false);

    const [profileImg,
        setProfileImg] = useState()
    const [coverImg,
        setCoverImg] = useState()

    const coverPicInputRef = useRef();
    const profilePicInputRef = useRef();
    const coverImgRef = useRef()
    const profileImgRef = useRef()

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
                await postRequest(`/friendship/send-friend-request/${user
                    ?._id}`);
            } else if (friendshipStatus.status === "pending" && friendshipStatus.requester === currentUser._id) {
                setFriendshipStatus({status: "no friendship", requester: ""});
                await postRequest(`/friendship/cancel-friend-request/${user
                    ?._id}`);
            } else if (friendshipStatus.status === "pending" && friendshipStatus.requester !== currentUser._id) {
                setFriendshipStatus({status: "accepted", requester: ""});
                await postRequest(`/friendship/accept-friend-request/${user
                    ?._id}`);
            } else if (friendshipStatus.status === "accepted") {
                setFriendshipStatus({status: "no friendship", requester: ""});
                setFriends(prev => prev.filter(friend => friend._id !== currentUser._id))
                await postRequest(`/friendship/unfriend/${user
                    ?._id}`);
            } else if (friendshipStatus.status === "rejected") {
                setFriendshipStatus({status: "pending", requester: currentUser._id});
                await postRequest(`/friendship/send-friend-request/${user
                    ?._id}`);
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleInput = (e, image) => {

        if (e.target.files.length > 0) {
            function getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                });
            }
            // setInput(e.target.files[0]);
            getBase64(e.target.files[0]).then(async(data) => {
                if (image === "cover") {
                    coverImgRef.current.src = data;
                    dispatch({
                        type: "EDIT_PROFILE_IMAGES",
                        payload: {
                            coverImage: data
                        }
                    });
                } else {
                    profileImgRef.current.src = data;
                    dispatch({
                        type: "EDIT_PROFILE_IMAGES",
                        payload: {
                            profileImage: data
                        }
                    });
                }
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                // console.log(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);

        }
    };

    const handleImageUpload = async (image, imageKey) => {
        if(image) {
            try {
                const imgRef = ref(imageDB, `files/${v4()}`);
                const snapshot = await uploadBytes(imgRef, image)
                const downloadURL = await getDownloadURL(snapshot.ref)
                await postRequest(`/user/edit-profile`, {[imageKey]: downloadURL})
            } catch (error) {
                console.log(`Error uploading ${imageKey} image: `, error)
            }
        }
    }

    useEffect(() => {
        if (profileImg) {
            handleImageUpload(profileImg, "profileImage")
        }
        if (coverImg) {
            handleImageUpload(coverImg, "coverImage")
        }
    }, [profileImg, coverImg])

    return (
        <div
            className="bg-white dark:bg-black dark:text-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3">
            <div className="relative">
                <img
                    ref={coverImgRef}
                    className="h-[200px] w-full object-cover rounded-md"
                    src={user
                    ?.profile
                        ?.coverImage || "https://img.freepik.com/free-photo/landscape-lake-surrounded-by-mountains_23-214" +
                            "8215162.jpg?w=1060&t=st=1693667013~exp=1693667613~hmac=cbe76fdbc4c315a22be951804" +
                                "9b4ce73ba01a29d7839bc73212e6627c7fe2bd3"}
                    alt="cover-picture"/>
                <img
                    ref={profileImgRef}
                    onClick={() => isCurrentUser && profilePicInputRef.current.click()}
                    className={`absolute w-[160px] h-[160px] rounded-full object-cover -bottom-[25%] left-[5%] border-[5px] border-white ${isCurrentUser && "cursor-pointer"}`}
                    src={user
                    ?.profile
                        ?.profileImage || "https://img.freepik.com/free-photo/landscape-lake-surrounded-by-mountains_23-214" +
                            "8215162.jpg?w=1060&t=st=1693667013~exp=1693667613~hmac=cbe76fdbc4c315a22be951804" +
                                "9b4ce73ba01a29d7839bc73212e6627c7fe2bd3"}
                    alt="profile-picture"/>
                <input
                    onChange={(e) => {
                    setProfileImg(e.target.files[0]);
                    handleInput(e, "profile");
                }}
                    ref={profilePicInputRef}
                    type="file"
                    className="hidden"/>{" "} {isCurrentUser && (
                    <div
                        onClick={() => coverPicInputRef.current.click()}
                        className="absolute w-[30px] h-[30px] flex items-center justify-center bg-white rounded-full top-2 right-2 cursor-pointer">
                        <HiPencil className="text-primary" size={25}/>
                        <input
                            onChange={(e) => {
                            setCoverImg(e.target.files[0]);
                            handleInput(e, "cover");
                        }}
                            ref={coverPicInputRef}
                            type="file"
                            className="hidden"/>
                    </div>
                )}
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
                                ? (
                                    <div>{user.profile.location}</div>
                                )
                                : null}
                    <div className="flex items-center gap-1.5">
                        <span>{friends
                                ?.length > 0
                                    ? friends
                                        ?.length
                                        : "No"}</span>
                        Friends
                    </div>
                    {!isCurrentUser && buttonText !== "" && (
                        <div className="mt-2">
                            <button
                                disabled={loading}
                                onClick={handleAddRemoveFriend}
                                className="bg-primary text-white px-2 py-1 5 rounded-md">
                                {buttonText}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default index