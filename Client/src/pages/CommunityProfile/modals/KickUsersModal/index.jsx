import {useEffect, useRef, useState} from "react";
import {handleCloseModal} from "../../../../utils/closeModal";
import {MdOutlineClose} from "react-icons/md";
import User from "./../../User"
import {postRequest} from "../../../../utils/requests";

const index = ({setShowKickUsersModal, members, communityId, setCommunity}) => {

    let [selectedMembers,
        setSelectedMembers] = useState([])
    const [isDisabled,
        setIsDisabled] = useState(true)
    const boxRef = useRef()

    useEffect(() => {
        selectedMembers
            ?.length > 0
                ? setIsDisabled(false)
                : setIsDisabled(true)
    }, [selectedMembers])

    const handleKickUsers = async() => {
        setCommunity((prev) => ({...prev, members: prev.members.filter((member) => !selectedMembers.includes(member._id))}));
        setShowKickUsersModal(false)
        const response = await postRequest(`/community/${communityId}/remove-members`, {usersIds:selectedMembers})
    };

    const closeModal = (e) => handleCloseModal(e, boxRef, setShowKickUsersModal);

    console.log(selectedMembers)

    return (
        <div
            onClick={closeModal}
            className="flex items-center justify-center absolute top-0 left-0 w-full h-screen bg-black/60 z-[20] px-4">
            <div
                ref={boxRef}
                className="bg-white w-full max-w-[550px] p-4 rounded-md flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <label className="text-lg font-medium" htmlFor="community-name">
                        Kick members
                    </label>
                    <MdOutlineClose
                        onClick={() => setShowKickUsersModal(false)}
                        className="cursor-pointer"
                        size={25}/>
                </div>
                <div
                    className="flex flex-col gap-2 max-h-[300px] overflow-scroll scrollbar-hide mb-5">
                    {members
                        ?.map((member, index) => (<User
                            key={index}
                            member={member}
                            setSelectedMembers={setSelectedMembers}
                            selectedMembers={selectedMembers}/>))}
                </div>
                <div>
                    <button
                        disabled={isDisabled}
                        onClick={handleKickUsers}
                        className="py-2 px-12 rounded-md bg-primary text-white font-medium">
                        Kick
                    </button>
                </div>
            </div>
        </div>
    );
}

export default index