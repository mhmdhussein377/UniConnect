import { handleRequestAction } from "../../utils/HandleNotification";

const index = ({_id, sender, content, community, type, setNotifications}) => {

    const handleAction = (e, action) => {
        handleRequestAction(e, action, type, sender, community, setNotifications, _id);
    };

    return (
        <div className="notification flex flex-col gap-3 bg-black/10 px-4 py-2">
            <div>{content}</div>
            {type
                .split(" ")
                .includes("request")
                ? <div className="flex gap-4">
                        <button onClick={e => handleAction(e, "accept")} className="bg-primary text-white px-4 py-1 rounded-md">
                            Accept
                        </button>
                        <button onClick={e => handleAction(e, "reject")} className="bg-primary text-white px-4 py-1 rounded-md">
                            Reject
                        </button>
                    </div>
                : null}
        </div>
    );
}

export default index