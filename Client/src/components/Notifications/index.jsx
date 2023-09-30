import Notification from "./../Notification"

const index = ({showNotifications, notifications, setNotifications, getCommunities}) => {

    return (
        <div
            className={`notifications absolute bg-white top-14 right-[0] w-full min-h-[350px] max-h-[300px] overflow-scroll scrollbar-hide min-w-[650px] max-w-[650px] rounded-md p-2 flex flex-col gap-3 z-[999] shadow-lg ${notifications.length === 0 && "items-center justify-center"} dark:bg-gray-100`}>
            <div className="flex flex-col gap-3 min-h-full mb-2">
                {notifications.length > 0
                    ? (notifications.map((notification, index) => (<Notification
                        key={index}
                        getCommunities={getCommunities}
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