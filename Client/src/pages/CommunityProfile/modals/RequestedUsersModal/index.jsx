import {useEffect, useRef, useState} from "react";
import {handleCloseModal} from "../../../../utils/closeModal";
import {MdOutlineClose} from "react-icons/md";
import User from "./../../User"

const index = ({setShowRequestedUsersModal, users}) => {

    let [selectedMembers,
        setSelectedMembers] = useState([])
    const [isDisabled,
        setIsDisabled] = useState(true)
    const boxRef = useRef()

    useEffect(() => {
        selectedMembers
            ?.length > 0
                ? setIsDisabled(false)
                : setIsDisabled(true);
    }, [selectedMembers]);

    const handleAcceptRequestedUsers = () => {}

    const closeModal = (e) => handleCloseModal(e, boxRef, setShowRequestedUsersModal);

    return (
        <div
            onClick={closeModal}
            className="flex items-center justify-center absolute top-0 left-0 w-full h-screen bg-black/60 z-[20] px-4">
            <div
                ref={boxRef}
                className="bg-white w-full max-w-[550px] p-4 rounded-md flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <label className="text-lg font-medium" htmlFor="community-name">
                        Accept requested users
                    </label>
                    <MdOutlineClose
                        onClick={() => setShowRequestedUsersModal(false)}
                        className="cursor-pointer"
                        size={25}/>
                </div>
                <div
                    className="flex flex-col gap-2 max-h-[300px] overflow-scroll scrollbar-hide mb-5">
                    {users
                        ?.map((member, index) => (<User
                            key={index}
                            member={member}
                            setSelectedMembers={setSelectedMembers}
                            selectedMembers={selectedMembers}/>))}
                </div>
                <div>
                    <button
                        disabled={isDisabled}
                        onClick={handleAcceptRequestedUsers}
                        className="py-2 px-12 rounded-md bg-primary text-white font-medium">
                        Kick
                    </button>
                </div>
            </div>
        </div>
    );
};

export default index