import {postRequest} from "./requests";

const handleNotification = async(apiEndpoint) => {
    try {
        await postRequest(apiEndpoint);
    } catch (error) {
        console.log(error);
    }
};

export const handleRequestAction = async(e, actionType, type, sender, community, setNotifications, currentNotification) => {
    e.stopPropagation();
    const senderId = sender._id

    setNotifications((prev) => prev.filter((noti) => noti._id !== currentNotification));

    let endpoint;

    switch (type) {
        case "friend request":
            endpoint = actionType === "accept"
                ? `/friendship/accept-friend-request/${senderId}`
                : `/friendship/reject-friend-request/${senderId}`;
            break;
        case "community join request":
            endpoint = actionType === "accept"
                ? `/community/accept-community-join-request/${community}/${senderId}`
                : `/community/reject-community-join-request/${community}/${senderId}`;
            break;
        case "community invite request":
            endpoint = actionType === "accept"
                ? `/community/accept-community-invite-request/${community}`
                : `/community/reject-community-invite-request/${community}`;
            break;
        default:
            return;
    }

    handleNotification(endpoint);
};
