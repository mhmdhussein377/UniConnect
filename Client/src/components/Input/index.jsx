import {useRef} from "react";
import {IoIosCloseCircleOutline} from "react-icons/io";

const index = ({
    label,
    handleChange,
    value,
    name,
    close,
    setUniversities
}) => {

    const inputRef = useRef()

    const handleInputClick = () => {
        setUniversities([]);
        inputRef.current.focus();
    }

    return (
        <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor={label}>
                {label}
            </label>
            <div
                className="w-full flex items-center p-2 rounded-md border-2 dark:border-black outline-none">
                <input
                    id={label}
                    ref={inputRef}
                    onChange={handleChange}
                    name={name}
                    className="flex-1 bg-transparent outline-none"
                    type="text"
                    value={value}/> 
                    {close && <IoIosCloseCircleOutline
                    onClick={handleInputClick}
                    className="cursor-pointer"
                    size={25}/>}
            </div>
        </div>
    );
}

export default index