import {useEffect, useState} from "react";
import Notification from "./../Notification"
import {getRequest} from "../../utils/requests";
import socket from "./../../utils/websocket"
import {useQuery} from "react-query"

const index = ({showNotifications}) => {

    let [notificaions,
        setNotifications] = useState([])

    const getNotifications = async() => {
        const response = await getRequest("/notifications");
        response && setNotifications(response.notificaions);
    };

    const {data, error, isLoading} = useQuery("myData", getNotifications, {refetchInterval: 5000});

    return (
        <div
            className={`notifications absolute bg-white top-14 right-[0] w-full min-h-[350px] max-h-[300px] overflow-scroll scrollbar-hide min-w-[650px] max-w-[650px] rounded-md p-2 flex flex-col gap-3 z-[999] shadow-lg ${notificaions.length === 0 && "items-center justify-center"}`}>
            <div className="flex flex-col gap-3 min-h-full">
                {notificaions.length > 0
                    ? (notificaions.map((notification, index) => (<Notification
                        key={index}
                        notification={notification}
                        setNotifications={setNotifications}
                        showNotifications={showNotifications}/>)))
                    : (
                        <div className="w-full max-w-[450px]">
                            <h1 className="text-2xl text-center font-medium">
                                No new notifications at the moment. Check back later for updates.
                            </h1>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default index