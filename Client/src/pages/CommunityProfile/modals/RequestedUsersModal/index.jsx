import {useEffect, useRef, useState} from "react";
import {handleCloseModal} from "../../../../utils/closeModal";
import {MdOutlineClose} from "react-icons/md";
import User from "./../../User"
import {postRequest} from "../../../../utils/requests";
import Button from "../components/Button";

const index = ({setShowRequestedUsersModal, users, setUsers, setCommunity, communityId}) => {

    const [selectedUsers,
        setSelectedUsers] = useState([])
    const [isDisabled,
        setIsDisabled] = useState(true)
    const boxRef = useRef()

    useEffect(() => {
        selectedUsers
            ?.length > 0
                ? setIsDisabled(false)
                : setIsDisabled(true);
    }, [selectedUsers]);

    const handleAcceptRequestedUsers = async() => {
        setCommunity(prev => ({
            ...prev,
            members: [
                ...prev.members,
                ...selectedUsers
            ],
            requestedUsers: prev
                .requestedUsers
                .filter(user => !selectedUsers.includes(user._id))
        }))
        setShowRequestedUsersModal(false)
        setUsers(prev => prev.filter(user => !selectedUsers.includes(user)))

        await postRequest(`/community/accept-community-join-requests/${communityId}`, {
            requestedUsersIds: selectedUsers.map((user) => user._id)
        });
    }

    const handleChange = (member) => {
        const isSelected = selectedUsers.some((selectedMember) => selectedMember === member);

        if (isSelected) {
            setSelectedUsers((prevSelectedMembers) => prevSelectedMembers.filter((selectedMember) => selectedMember !== member));
        } else {
            setSelectedUsers((prevSelectedMembers) => [
                ...prevSelectedMembers,
                member
            ]);
        }
    };

    const closeModal = (e) => handleCloseModal(e, boxRef, setShowRequestedUsersModal);

    return (
        <div
            onClick={closeModal}
            className="flex items-center justify-center absolute top-0 left-0 w-full h-screen bg-black/60 z-[20] px-4">
            <div
                ref={boxRef}
                className="bg-white w-full max-w-[550px] p-4 rounded-md flex flex-col gap-4 dark:grayMedium">
                <div className="flex items-center justify-between">
                    <label className="text-lg font-medium text-primary" htmlFor="community-name">
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
                        ?.map((member, index) => (<User key={index} member={member} handleChange={() => handleChange(member)}/>))}
                </div>
                <div>
                    <Button
                        onClickHandler={handleAcceptRequestedUsers}
                        buttonText="Accept requests"
                        isDisabled={isDisabled}
                        isSubmit={false}/>
                </div>
            </div>
        </div>
    );
};

export default index