import { useRef } from "react";
import {IoIosCloseCircleOutline} from "react-icons/io";

const index = ({label, handleChange, value, name, close, setUniversities}) => {

    const inputRef = useRef()

    return (
        <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor={label}>
                {label}
            </label>
                {/* {!close && (<input
                    id={label}
                    onChange={handleChange}
                    name={name}
                    className="p-2 rounded-md border-2 outline-none"
                    type="text"
                    value={value}/>)} */}
                    <div className="w-full flex items-center p-2 rounded-md border-2 outline-none">
                        <input
                            id={label}
                            ref={inputRef}
                            onChange={handleChange}
                            name={name}
                            className="flex-1 bg-transparent outline-none"
                            type="text"
                            value={value}/>
                        {close && <IoIosCloseCircleOutline onClick={() => {setUniversities([]); inputRef.current.focus()}} className="cursor-pointer" size={25} />}
                    </div>
                {/* )} */}
        </div>
    );
}

export default index