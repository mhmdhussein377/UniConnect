import {useContext, useEffect, useRef, useState} from "react";
import {handleCloseModal} from "../../../../utils/closeModal";
import {MdOutlineClose} from "react-icons/md";
import {postRequest} from "../../../../utils/requests";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";

const index = ({setShowDeleteCommunityModal, communityName, communityId}) => {

    const {dispatch} = useContext(AuthContext)

    const [input,
        setInput] = useState("")
    const [isDisabled,
        setIsDisabled] = useState(true)
    const boxRef = useRef()
    const navigate = useNavigate()
    
    const handleDeleteCommunity = async() => {
        if (input === communityName) {
            dispatch({ type: "DELETE_COMMUNITY", payload: communityId });
            navigate('/home')
            await postRequest(`/community/delete/${communityId}`, {communityName});
        }
    }
    
    useEffect(() => {
        setIsDisabled(input !== communityName)
    }, [input, communityName])
    
    const closeModal = (e) => handleCloseModal(e, boxRef, setShowDeleteCommunityModal);

    return (
        <div
            onClick={closeModal}
            className={`flex items-center justify-center absolute top-0 left-0 w-full h-screen bg-black/60 z-[20] px-4`}>
            <div
                ref={boxRef}
                className="bg-white w-full max-w-[550px] p-4 rounded-md flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <label className="text-lg font-medium text-primary" htmlFor="remove-members">
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
                        <span className="font-semibold text-lg text-primary">{communityName}</span>" to delete the community
                    </p>
                    <input
                        id="remove-members"
                        className="border-b-2 border-b-primary outline-none px-2 py-1.5 placeholder:text-lg"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Community name"/>
                    <div>
                        <button
                            disabled={isDisabled}
                            onClick={handleDeleteCommunity}
                            className="py-2 px-12 rounded-md bg-primary text-white font-medium">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default index