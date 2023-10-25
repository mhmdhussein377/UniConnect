import {useContext, useRef, useState} from "react";
import {MdOutlineClose} from "react-icons/md";
import {handleCloseModal} from "../../utils/closeModal";
import {handleChange} from "../../utils/handleChange"
import {postRequest} from "../../utils/requests"
import {AuthContext} from "../../Context/AuthContext";
import RadioInput from "./../RadioInput"

const index = ({setShowCommunityModal, setCommunities}) => {

    const {dispatch} = useContext(AuthContext)

    const [inputs,
        setInputs] = useState({})
    const [error,
        setErrors] = useState({})
    const boxRef = useRef()

    const handleInputChange = (e) => {
        handleChange(e, setInputs)
    }

    const handleCreateCommunity = async(e) => {
        e.preventDefault()

        const {name, description, privacy} = inputs

        if (!name || !description || !privacy) {
            setErrors({isError: true, type: "Missing fields", message: "All fields are required"});
            setTimeout(() => {
                setErrors({isError: false, type: "", message: ""});
            }, 3000)
            return;
        }

        setShowCommunityModal(false)
        const response = await postRequest("/community/create", inputs)
        const {name: communityName, privacy: communityPrivacy, _id, creator} = response

        setCommunities(prev => [
            {
                ID: _id,
                name: communityName,
                privacy: communityPrivacy,
                unreadCount: 0,
                lastMessages: []
            },
            ...prev
        ])
        dispatch({
            type: "CREATE_COMMUNITY",
            payload: {
                name: communityName,
                privacy: communityPrivacy,
                _id,
                creator
            }
        })
    }

    const closeModal = (e) => handleCloseModal(e, boxRef, setShowCommunityModal);

    return (
        <div
            onClick={closeModal}
            className="flex items-center justify-center absolute top-0 left-0 w-full h-screen bg-black/60 z-[20] px-4">
            <form
                onSubmit={handleCreateCommunity}
                ref={boxRef}
                className="bg-white w-full max-w-[550px] p-4 rounded-md flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-lg font-medium" htmlFor="community-name">
                            Community name
                        </label>
                        <MdOutlineClose
                            onClick={() => setShowCommunityModal(false)}
                            className="cursor-pointer"
                            size={25}/>
                    </div>
                    <input
                        id="community-name"
                        onChange={handleInputChange}
                        type="text"
                        name="name"
                        className="border-b-2 border-b-primary outline-none px-2"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-medium" htmlFor="community-desc">
                        Description
                    </label>
                    <input
                        id="community-desc"
                        onChange={handleInputChange}
                        type="text"
                        name="description"
                        className="border-b-2 border-b-primary outline-none px-2"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-lg font-medium">
                        Privacy
                    </label>
                    <div className="flex gap-8">
                        <RadioInput
                            id="public"
                            name="privacy"
                            value="public"
                            onChange={handleInputChange}
                            label="Public"/>
                        <RadioInput
                            id="private"
                            name="privacy"
                            value="private"
                            onChange={handleInputChange}
                            label="Private"/>
                    </div>
                    {error.isError && (
                        <p className="text-danger text-start">{error.message}</p>
                    )}
                    <div className="mt-2">
                        <button
                            type="submit"
                            className="py-2 px-12 rounded-md bg-primary text-white font-medium">
                            Create Community
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default index;
