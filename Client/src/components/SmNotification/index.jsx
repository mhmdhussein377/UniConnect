const index = () => {
    return (
        <div className="notification flex flex-col gap-3 bg-black/10 px-4 py-2">
            <div>Ahmad wants to join your community "Coding"</div>
            <div className="flex gap-4">
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