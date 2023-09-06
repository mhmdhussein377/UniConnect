const index = ({label, handleChange, value, name}) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor={label}>
                {label}
            </label>
            <input
                id={label}
                onChange={handleChange}
                name={name}
                className="p-2 rounded-md border-2 outline-none"
                type="text"
                value={value}/>
        </div>
    );
}

export default index