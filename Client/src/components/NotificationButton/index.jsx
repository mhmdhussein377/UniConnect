const index = ({text, action, handleAction}) => {
    return (
        <button
            onClick={e => handleAction(e, action)}
            className="bg-primary text-white px-4 py-1 rounded-md">
            {text}
        </button>
    );
}

export default index