const index = () => {
    return (
        <div
            className="noti absolute bg-white big-shadow top-14 right-[0] w-full min-h-[350px] max-h-[300px] overflow-scroll scrollbar-hide min-w-[650px] max-w-[650px] rounded-md p-2 flex flex-col gap-3 z-[999]">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div
                        className="w-[35px] h-[35px] rounded-full flex items-center justify-center overflow-hidden">
                        <img
                            src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                            alt="profile-picture"/>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Mohammad Hussein</span>
                        sent you a friend request
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-primary text-white px-4 py-1 rounded-md">
                        Accept
                    </button>
                    <button className="bg-primary text-white px-4 py-1 rounded-md">
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
}

export default index