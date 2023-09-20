const index = ({_id, sender, content, community, type}) => {
    return (
        <div className="notification flex flex-col gap-3 bg-black/10 px-4 py-2">
            <div>{content}</div>
            {type.split(" ").includes("request") ? <div className="flex gap-4">
                <button className="bg-primary text-white px-4 py-1 rounded-md">
                    Accept
                </button>
                <button className="bg-primary text-white px-4 py-1 rounded-md">
                    Reject
                </button>
            </div> : null}
        </div>
    );
}

export default index