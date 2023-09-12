import {BiHash} from "react-icons/bi";
import {FiLock} from "react-icons/fi";
import {Link} from "react-router-dom";

const index = ({name, privacy, id, creatorUsername, withoutUsername}) => {

    return (
        <Link
            to={`/community/${id}`}
            className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <div
                    className="w-[45px] h-[45px] rounded-full flex items-center justify-center overflow-hidden bg-gray-200">
                    {privacy === "public"
                        ? <BiHash size={25}/>
                        : <FiLock size={25}/>}
                </div>
                <div>
                    <div className="font-medium">{name}</div>
                    {!withoutUsername && <div className="text-sm">Created by {creatorUsername}</div>}
                </div>
            </div>
            {/* <div>
                {isJoined
                    ? (
                        <button
                            onClick={() => setIsJoined(false)}
                            className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium">
                            <AiOutlineMinus/>
                            Leave community
                        </button>
                    )
                    : (
                        <button
                            onClick={() => setIsJoined(true)}
                            className="bg-primary text-white py-1.5 px-3 rounded-md flex items-center gap-1 font-medium">
                            <AiOutlinePlus/>
                            Join community
                        </button>
                    )}
            </div> */}
        </Link>
    );
};

export default index;
