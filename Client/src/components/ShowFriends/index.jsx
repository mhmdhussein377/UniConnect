import Member from "./../../components/Member"

const index = ({friends}) => {
    return (
        <div
            className="bg-white drop-shadow-lg max-w-full p-4 rounded-md h-fit flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <div className="font-semibold text-lg">Friends</div>
                <div className="flex flex-col gap-4">
                    {friends.length > 0 && friends.map((friend, index) => (<Member key={index} member={friend} />))}
                </div>
            </div>
        </div>
    );
}

export default index