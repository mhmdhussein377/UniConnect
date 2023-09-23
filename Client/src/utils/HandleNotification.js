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
    setNotifications((prev) => prev.filter((noti) => noti._id !== currentNotification));

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
            return;
    }

    handleNotification(endpoint);
};
