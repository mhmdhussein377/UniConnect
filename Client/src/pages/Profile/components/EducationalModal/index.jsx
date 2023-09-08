import {GrClose} from "react-icons/gr";
import {useContext, useRef, useState} from "react";
import Input from "./../../../../components/Input"
import {handleCloseModal} from "./../../../../utils/closeModal"
import { AuthContext } from "../../../../Context/AuthContext";
import {postRequest} from "./../../../../utils/requests"
import {handleChange} from "./../../../../utils/handleChange"

const index = ({setShowEducationalInfoModal}) => {

    const {user, dispatch} = useContext(AuthContext)
    const {university, major} = user.profile

    let [inputs,setInputs] = useState({university: university || "", major: major || ""})
    const boxRef = useRef();

    const handleInputsChange = (e) => {
        handleChange(e, setInputs)
    };

    const handleEditEducationalInfo = async() => {
        dispatch({ type: "EDIT_EDUCATIONAL_INFO", payload: inputs });
        setShowEducationalInfoModal(false);

        await postRequest("/api/user/edit-profile", inputs)
    }

    const closeModal = (e) => handleCloseModal(e, boxRef, setShowEducationalInfoModal);

    return (
        <div
            onClick={closeModal}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/40 z-50 flex items-center justify-center px-2 overflow-hidden max-h-screen">
            <div
                ref={boxRef}
                className="flex flex-col gap-6 p-4 bg-white rounded-md w-full max-w-[500px]">
                <div className="flex items-center justify-between pb-2 border-b-2">
                    <div className="text-lg font-semibold">
                        Edit educational information
                    </div>
                    <div
                        onClick={() => setShowEducationalInfoModal(false)}
                        className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer">
                        <GrClose size={20}/>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <Input
                        label="University"
                        name="university"
                        value={inputs.university}
                        handleChange={handleInputsChange}/>
                    <Input
                        label="Major"
                        name="major"
                        value={inputs.major}
                        handleChange={handleInputsChange}/>
                    <div>
                        <button
                            onClick={handleEditEducationalInfo}
                            className="bg-primary text-white p-2 rounded-md mt-4 font-medium">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;
