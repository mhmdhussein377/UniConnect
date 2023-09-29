import {useEffect, useRef, useState} from "react";
import {handleCloseModal} from "../../../../utils/closeModal";
import {MdOutlineClose} from "react-icons/md";
import User from "./../../User"
import {postRequest} from "../../../../utils/requests";

const index = ({setShowKickUsersModal, members, communityId, setMembers}) => {

    const [selectedMembers, setSelectedMembers] = useState([])
    const [isDisabled, setIsDisabled] = useState(true)
    const boxRef = useRef()

    useEffect(() => {
        selectedMembers?.length > 0 ? setIsDisabled(false) : setIsDisabled(true)
    }, [selectedMembers])

    const handleKickUsers = async() => {
        setMembers(prev => prev.filter(member => !selectedMembers.includes(member._id)))
        setShowKickUsersModal(false)
        await postRequest(`/community/${communityId}/remove-members`, {usersIds: selectedMembers})
    };
    
    const handleChange = (member) => {
        const {_id} = member
        const isSelected = selectedMembers.some((selectedMember) => selectedMember === _id);

        if (isSelected) {
            setSelectedMembers((prevSelectedMembers) => prevSelectedMembers.filter((selectedMember) => selectedMember !== _id));
        } else {
            setSelectedMembers((prevSelectedMembers) => [...prevSelectedMembers, _id]);
        }
    }
    
    const closeModal = (e) => handleCloseModal(e, boxRef, setShowKickUsersModal);

    return (
        <div
            onClick={closeModal}
            className="flex items-center justify-center absolute top-0 left-0 w-full h-screen bg-black/60 z-[20] px-4">
            <div
                ref={boxRef}
                className="bg-white w-full max-w-[550px] p-4 rounded-md flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <label className="text-lg font-medium text-primary" htmlFor="community-name">
                        Remove members
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
                            handleChange={() => handleChange(member)}
                            selectedMembers={selectedMembers}/>))}
                </div>
                <div>
                    <button
                        disabled={isDisabled}
                        onClick={handleKickUsers}
                        className="py-2 px-12 rounded-md bg-primary text-white font-medium">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

export default index