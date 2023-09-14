import {useRef, useState} from "react";
import {MdOutlineClose} from "react-icons/md";
import {handleCloseModal} from "./../../../../utils/closeModal";
import {handleChange} from "./../../../../utils/handleChange";
import {postRequest} from "./../../../../utils/requests";

const index = ({setShowUpdateCommunityModal, setCommunity, name, description, privacy, _id}) => {

    let [inputs,
        setInputs] = useState({name, description, privacy})
    let [error,
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

        setCommunity(prev => ({...prev, name, description, privacy}))

        const response = await postRequest(`/community/update/${_id}`, inputs)
        response && setShowUpdateCommunityModal(false)
    }

    const closeModal = (e) => handleCloseModal(e, boxRef, setShowUpdateCommunityModal);

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
                            onClick={() => setShowUpdateCommunityModal(false)}
                            className="cursor-pointer"
                            size={25}/>
                    </div>
                    <input
                        id="community-name"
                        onChange={handleInputChange}
                        value={inputs.name}
                        type="text"
                        name="name"
                        className="border-b-2 border-b-primary outline-none px-2 py-1.5"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-medium" htmlFor="community-desc">
                        Description
                    </label>
                    <input
                        id="community-desc"
                        onChange={handleInputChange}
                        value={inputs.description}
                        type="text"
                        name="description"
                        className="border-b-2 border-b-primary outline-none px-2 py-1.5"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-lg font-medium">
                        Privacy
                    </label>
                    <div className="flex gap-8">
                        <label
                            className="flex items-center justify-center gap-2 text-[16px] select-none cursor-pointer"
                            htmlFor="public">
                            <input
                                id="public"
                                onChange={handleInputChange}
                                checked={inputs.privacy === "public"}
                                className="w-4 h-4 custom-radio"
                                type="radio"
                                name="privacy"
                                value="public"/>
                            Public
                        </label>
                        <label
                            className="flex items-center justify-center gap-2 text-[16px] select-none cursor-pointer"
                            htmlFor="private">
                            <input
                                id="private"
                                onChange={handleInputChange}
                                checked={inputs.privacy === "private"}
                                className="w-4 h-4 custom-radio"
                                type="radio"
                                name="privacy"
                                value="private"/>
                            Private
                        </label>
                    </div>
                    {error.isError && <p className="text-danger text-start">{error.message}</p>}
                    <div className="mt-2">
                        <button
                            type="submit"
                            className="py-2 px-12 rounded-md bg-primary text-white font-medium">
                            Update Community
                        </button>
                    </div>
                </div>
            </form>
        </div>)
};

export default index;
