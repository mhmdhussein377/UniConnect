import {useState} from "react";
import {BsArrowLeft} from "react-icons/bs"
import {useNavigate} from "react-router-dom";
import {getRequest} from "../../utils/requests";
import SmNotification from "./../../components/SmNotification"
import { useQuery } from "react-query";

const index = () => {

    const navigate = useNavigate()
    const [notifications,
        setNotifications] = useState([]);

    const getNotifications = async() => {
        const response = await getRequest("/notifications");
        response && setNotifications(response.notifications);
    };

    const {data, error, isLoading} = useQuery("myData", getNotifications, {refetchInterval: 2000});

    const handleBackClick = () => {
        navigate(-1)
    }

    return (
        <div className="absolute top-0 left-0 w-full z-[99] min-h-[100vh]">
            <div
                className="h-[70px] flex items-center gap-4 text-lg font-semibold px-4 py-2 border-b-[2px] border-b-grayHard">
                <div onClick={handleBackClick} className="cursor-pointer">
                    <BsArrowLeft size={30}/>
                </div>
                <h2>Notifications</h2>
            </div>
            <div
                className={`sm-notifications flex flex-col bg-[#F4F3FC] flex-1  ${notifications.length == 0 ? "items-center justify-center" : null}`}>
                {notifications.length > 0
                    ? (notifications.map((noti, index) => (<SmNotification {...noti} key={index} setNotifications={setNotifications}/>)))
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