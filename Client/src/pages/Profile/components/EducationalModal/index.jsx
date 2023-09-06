import {GrClose} from "react-icons/gr";
import {useRef, useState} from "react";
import Input from "./../../../../components/Input"

const index = ({setShowEducationalInfoModal}) => {

    let [inputs,
        setInputs] = useState({universtiy: "", major: ""})

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const handleEditEducationalInfo = () => {}

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/40 z-50 flex items-center justify-center px-2 overflow-hidden max-h-screen">
            <div
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
                        handleChange={handleChange}/>
                    <Input
                        label="Major"
                        name="major"
                        value={inputs.major}
                        handleChange={handleChange}/>{" "}
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
