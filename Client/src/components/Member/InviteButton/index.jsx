const index = ({handleInvite, loading, icon, text}) => {
    return (
        <button
            onClick={handleInvite}
            disabled={loading}
            className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium">
            {icon}
            {text}
        </button>
    );
}

export default index