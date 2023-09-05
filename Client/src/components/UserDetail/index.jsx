
const index = ({icon, label, value}) => {
    return (
        <div className="flex items-center">
            <div className="flex items-center gap-1.5 w-[120px] text-gray-600 text-[16px]">
                {icon}
                {label}
            </div>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full font-medium">
                {value}
            </span>
        </div>
    )
}

export default index