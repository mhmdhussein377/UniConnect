import {useRef, useState} from "react";
import {MdOutlineClose} from "react-icons/md";
import {handleCloseModal} from "../../utils/closeModal";

const index = ({setShowCommunityModal}) => {

    let [inputs,
        setInputs] = useState({})
    let [errors, setErrors] = useState({})
    const boxRef = useRef()

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const closeModal = (e) => handleCloseModal(e, boxRef, setShowCommunityModal);

    return (
        <div
            onClick={closeModal}
            className="flex items-center justify-center absolute top-0 left-0 w-full h-screen bg-black/60 z-[20] px-4">
            <form
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        type="text"
                        name="description"
                        className="border-b-2 border-b-primary outline-none px-2"/>
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                                className="w-4 h-4 custom-radio"
                                type="radio"
                                name="privacy"
                                value="private"/>
                            Private
                        </label>
                    </div>
                    <div className="mt-2">
                        <button className="py-2 px-12 rounded-md bg-primary text-white font-medium">
                            Create Community
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default index;
