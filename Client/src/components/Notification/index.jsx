import { handleRequestAction } from "../../utils/HandleNotification";

const index = ({notification, setNotifications}) => {

    const {content, sender, type, _id, community} = notification

    const handleAction = (e, action) => {
        handleRequestAction(e, action, type, sender, community, setNotifications, _id)
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
            {!type
                .split(" ")
                .includes("accepted")
                ? <div className="flex items-center gap-4">
                        <button
                            onClick={e => handleAction(e, "accept")}
                            className="bg-primary text-white px-4 py-1 rounded-md">
                            Accept
                        </button>
                        <button
                            onClick={e => handleAction(e, "reject")}
                            className="bg-primary text-white px-4 py-1 rounded-md">
                            Reject
                        </button>
                    </div>
                : null}
        </div>
    );
}

export default index