
const Button = ({setModal, text}) => {
    return (
        <button
            onClick={() => setModal(true)}
            className="w-full bg-primary text-white rounded-md py-1 text-lg font-medium">
            {text}
        </button>
    );
}

export default Button