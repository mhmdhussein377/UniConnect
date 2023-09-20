import {postRequest} from "../../utils/requests"

const index = ({notification, setNotifications}) => {

    const {content, sender, type, _id, community} = notification

    const handleNotification = async(apiEndpoint) => {
        try {
            setNotifications(prev => prev.filter(noti => noti._id !== _id))
            await postRequest(apiEndpoint)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAcceptRequest = async(e) => {
        e.stopPropagation()

        if (type === "friend request") {
            handleNotification(`/friendship/accept-friend-request/${sender}`);
        } else if (type === "community join request") {
            handleNotification(`/community/accept-community-join-request/${community}/${sender}`);
        } else if (type === "community invite request") {
            handleNotification(`/community/accept-community-invite-request/${community}`);
        }
    }

    const handleRejectRequest = async(e) => {
        e.stopPropagation()
        if (type === "friend request") {
            try {
                setNotifications((prev) => prev.filter((noti) => noti._id !== _id));
                await postRequest(`/friendship/reject-friend-request/${sender}`);
            } catch (error) {
                console.log(error);
            }
        } else if (type === "community join request") {
            try {
                setNotifications((prev) => prev.filter((noti) => noti._id !== _id));
                await postRequest(`/community/reject-community-join-request/${community}/${sender}`);
            } catch (error) {
                console.log(error);
            }
        } else if (type === "community invite request") {
            try {
                setNotifications((prev) => prev.filter((noti) => noti._id !== _id));
                await postRequest(`/community/reject-community-invite-request/${community}`);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <div
                    className="min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-full flex items-center justify-center overflow-hidden">
                    <img
                        src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                        alt="profile-picture"/>
                </div>
                <div className="flex flex-row items-center gap-2 flex-wrap">
                    {/* <span className="font-medium text-[18px]">Mohammad Hussein</span>
                    sent you a friend request */}
                    {content}
                </div>
            </div>
            {type
                .split(" ")
                .includes("request")
                ? <div className="flex items-center gap-4">
                        <button
                            onClick={handleAcceptRequest}
                            className="bg-primary text-white px-4 py-1 rounded-md">
                            Accept
                        </button>
                        <button
                            onClick={handleRejectRequest}
                            className="bg-primary text-white px-4 py-1 rounded-md">
                            Reject
                        </button>
                    </div>
                : null}
        </div>
    );
}

export default index