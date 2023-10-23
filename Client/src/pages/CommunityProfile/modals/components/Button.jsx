
const Button = ({onClickHandler, buttonText, isDisabled, isSubmit}) => {
    return (
        <button onClick={onClickHandler} disabled={isDisabled} 
        type={isSubmit ? "submit" : "button"}
    className="py-2 px-12 rounded-md bg-primary text-white font-medium">
            {buttonText}
        </button>
    );
};

export default Button;
