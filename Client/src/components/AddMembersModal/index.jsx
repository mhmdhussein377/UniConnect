import {MdOutlineClose} from "react-icons/md";
import Member from "./../Member"
import {handleCloseModal} from "./../../utils/closeModal"
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../Context/AuthContext";
import {getRequest} from "../../utils/requests"
import {useDebounce} from "use-debounce"

const index = ({setShowAddMembersModal, communityId}) => {

    let [friends,
        setFriends] = useState([])
    let [searchedUsers,
        setSearchedUsers] = useState([])
    let [searchTerm,
        setSearchTerm] = useState("")
    let [debouncedValue] = useDebounce(searchTerm, 500)
    const boxRef = useRef()

    useEffect(() => {
        const getUserFriends = async() => {
            const response = await getRequest(`/user/friends/${communityId}`);
            response && setFriends(response.friends)
        }
        getUserFriends()
    }, [communityId])

    useEffect(() => {
        const searchUsers = async() => {
            const response = await getRequest(`/user/search/${debouncedValue}/${communityId}`)
            response && setSearchedUsers(response.users)
        }
        if (debouncedValue !== "") {
            searchUsers()
        }
    }, [debouncedValue, communityId])

    const closeModal = (e) => handleCloseModal(e, boxRef, setShowAddMembersModal);

    const handleInputChange = (e) => {
        if (e.target.value === "") {
            setSearchedUsers([])
        }
        setSearchTerm(e.target.value)
    }

    return (
        <div
            onClick={closeModal}
            className={`flex items-center justify-center absolute top-0 left-0 w-full h-screen bg-black/60 z-[20] px-4`}>
            <div
                ref={boxRef}
                className="bg-white w-full max-w-[550px] min-h-[400px] p-4 rounded-md flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-lg font-medium" htmlFor="add-members">
                            Add members
                        </label>
                        <MdOutlineClose
                            onClick={() => setShowAddMembersModal(false)}
                            className="cursor-pointer"
                            size={25}/>
                    </div>
                    <input
                        id="add-members"
                        value={searchTerm}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Search for users to add"
                        className="border-b-2 border-b-primary outline-none px-2 py-1.5 placeholder:text-lg"/>
                </div>
                <div
                    className="flex flex-col gap-2 max-h-[300px] overflow-scroll scrollbar-hide mb-5">
                    {searchedUsers.length > 0
                        ? searchedUsers.map((user, index) => (<Member
                            communityId={communityId}
                            key={index}
                            invite={true}
                            member={user}
                            inModal={true}/>))
                        : friends.map((friend, index) => {
                            return (<Member
                                communityId={communityId}
                                key={index}
                                invite={true}
                                member={friend}
                                inModal={true}/>);

                        })}
                </div>
                {/* {selectedUsers.length > 0 && (
                    <div className=" mt-auto">
                        <button className="bg-primary text-white px-4 py-2 rounded-md">
                            Invite Users
                        </button>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default index;
