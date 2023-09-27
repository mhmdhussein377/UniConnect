const Button = ({text, icon, setShowAllData}) => {
    return (
        <button
            onClick={() => setShowAllData((prev) => !prev)}
            className="text-[16px] font-medium text-primary flex items-center gap-2">
            {text}
            {icon}
        </button>
    );
}

export default Button