const index = () => {
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
                    <span className="font-medium text-[18px]">Mohammad Hussein</span>
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
    );
}

export default index