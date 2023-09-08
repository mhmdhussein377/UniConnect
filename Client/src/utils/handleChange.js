export const handleChange = (e, setInputs) => {
    setInputs(prev => ({
        ...prev,
        [e.target.name] : e.target.value
    }));
};