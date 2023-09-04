
const Input = ({handleChange, type, name, placeholder, icon}) => {
    return (
        <div className="flex pr-4 items-center rounded-md border-[2px] border-grayMedium bg-grayLight">
            <input className="flex-1 px-4 py-3.5 h-full outline-none border-none placeholder:text-[#8590AA] bg-transparent font-medium" onChange={handleChange} type={type} placeholder={placeholder} name={name} />{icon}
        </div>
    )
}

export default Input