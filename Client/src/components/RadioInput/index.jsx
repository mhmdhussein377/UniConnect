const index = ({id, name, value, onChange, label}) => (
    <label
        className="flex items-center justify-center gap-2 text-[16px] select-none cursor-pointer"
        htmlFor={id}>
        <input
            id={id}
            onChange={onChange}
            className="w-4 h-4 custom-radio"
            type="radio"
            name={name}
            value={value}/> {label}
    </label>
);

export default index