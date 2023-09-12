import { useEffect, useState } from "react";
import Notification from "./../Notification"
import { getRequest } from "../../utils/requests";

const index = () => {

    let [notificaions, setNotifications] = useState([])

    useEffect(() => {
        const getNotifications = async() => {
            const response = await getRequest("/notifications")
            response && setNotifications(response.notificaions)
        }
        getNotifications()
    }, [])

    return (
        <div
            className="notifications absolute bg-white top-14 right-[0] w-full min-h-[350px] max-h-[300px] overflow-scroll scrollbar-hide min-w-[650px] max-w-[650px] rounded-md p-2 flex flex-col gap-3 z-[999] shadow-lg">
            <div className="flex flex-col gap-3">
                {notificaions.length > 0 ? notificaions.map((notification, index) => (
                    <Notification key={index} notification={notification} />
                )) : <h1>No notifications</h1>}
            </div>
        </div>
    );
}

export default index