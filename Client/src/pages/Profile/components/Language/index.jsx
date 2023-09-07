const index = ({label, checked, onChange}) => {
    return (
        <label className="flex gap-2 text-lg cursor-pointer">
            <input
                className="w-4 checked:bg-primary"
                value={label}
                checked={checked}
                onChange={onChange}
                type="checkbox"/>
            <span>{label}</span>
        </label>
    );
}

export default index