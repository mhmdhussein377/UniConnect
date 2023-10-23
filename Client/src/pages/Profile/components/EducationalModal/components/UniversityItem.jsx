
const UniversityItem = ({university, setInputs, setUniversities, setClicked}) => {
    const handleClick = () => {
        setInputs((prev) => ({
            ...prev,
            university: university?.name
        }));
        setUniversities([]);
        setClicked(true);
    };

    return (
        <h1 onClick={handleClick} className="cursor-pointer">
            {university?.name}
        </h1>
    );
};

export default UniversityItem;
