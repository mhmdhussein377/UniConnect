import {useRef, useState} from "react";
import {handleCloseModal} from "../../../../utils/closeModal";
import {MdOutlineClose} from "react-icons/md";

const index = ({setShowDeleteCommunityModal, communityName}) => {

    let [input, setInput] = useState("")
    const boxRef = useRef()

    const closeModal = (e) => handleCloseModal(e, boxRef, setShowDeleteCommunityModal);

    return (
        <div
            onClick={closeModal}
            className={`flex items-center justify-center absolute top-0 left-0 w-full h-screen bg-black/60 z-[20] px-4`}>
            <div
                ref={boxRef}
                className="bg-white w-full max-w-[550px] p-4 rounded-md flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <label className="text-lg font-medium" htmlFor="add-members">
                        Delete community
                    </label>
                    <MdOutlineClose
                        onClick={() => setShowDeleteCommunityModal(false)}
                        className="cursor-pointer"
                        size={25}/>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="">
                        Enter the name of the community "
                        <span className="font-semibold text-lg">{communityName}</span>" to delete the community
                    </p>
                    <input
                        className="border-b-2 border-b-primary outline-none px-2 py-1.5 placeholder:text-lg"
                        type="text"
                        placeholder="Community name"/>
                </div>
            </div>
        </div>
    );
}

export default index