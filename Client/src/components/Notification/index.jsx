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

    const handleRequestAction = async(e, actionType) => {
        e.stopPropagation()

        let endpoint;

        switch (type) {
            case "friend request":
                endpoint = actionType === "accept"
                    ? `/friendship/accept-friend-request/${sender}`
                    : `/friendship/reject-friend-request/${sender}`;
                break;
            case "community join request":
                endpoint = actionType === "accept"
                    ? `/community/accept-community-join-request/${community}/${sender}`
                    : `/community/reject-community-join-request/${community}/${sender}`;
                break;
            case "community invite request":
                endpoint = actionType === "accept"
                    ? `/community/accept-community-invite-request/${community}`
                    : `/community/reject-community-invite-request/${community}`;
                break;
            default:
                return
        }

        handleNotification(endpoint)
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
                    {content}
                </div>
            </div>
            {type
                .split(" ")
                .includes("request")
                ? <div className="flex items-center gap-4">
                        <button
                            onClick={e => handleRequestAction(e, "accept")}
                            className="bg-primary text-white px-4 py-1 rounded-md">
                            Accept
                        </button>
                        <button
                            onClick={e => handleRequestAction(e, "reject")}
                            className="bg-primary text-white px-4 py-1 rounded-md">
                            Reject
                        </button>
                    </div>
                : null}
        </div>
    );
}

export default index