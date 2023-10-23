import {GrClose} from "react-icons/gr";
import {useContext, useEffect, useRef, useState} from "react";
import Input from "./../../../../components/Input"
import {handleCloseModal} from "./../../../../utils/closeModal"
import {AuthContext} from "../../../../Context/AuthContext";
import {postRequest} from "./../../../../utils/requests"
import {handleChange} from "./../../../../utils/handleChange"
import axios from "axios";
import {useDebounce} from "use-debounce";
import UniversityList from "./components/UniversityList";

const index = ({setShowEducationalInfoModal}) => {

    const {user, dispatch} = useContext(AuthContext)
    const {university, major} = user.profile

    const [inputs,
        setInputs] = useState({
        university: university || "",
        major: major || ""
    })
    const [debouncedValue] = useDebounce(inputs.university, 1000);
    const [universities,
        setUniversities] = useState([])
    const [clicked,
        setClicked] = useState(false)
    const boxRef = useRef();

    const handleInputsChange = (e) => {
        handleChange(e, setInputs)
        setClicked(false)
    };

    const handleEditEducationalInfo = async() => {
        dispatch({type: "EDIT_EDUCATIONAL_INFO", payload: inputs});
        setShowEducationalInfoModal(false);

        await postRequest("/user/edit-profile", inputs)
    }

    useEffect(() => {
        if (inputs.university === "") {
            setUniversities([])
        }
        const getCountries = async() => {
            const {data} = await axios.get(`http://universities.hipolabs.com/search?name=${debouncedValue}`);
            setUniversities(data)
        };
        if (debouncedValue !== university && !clicked) {
            getCountries()
        }
    }, [debouncedValue]);

    const closeModal = (e) => handleCloseModal(e, boxRef, setShowEducationalInfoModal);

    return (
        <div
            onClick={closeModal}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/40 z-50 flex items-center justify-center px-2 overflow-hidden max-h-screen dark:bg-black/60">
            <form
                onSubmit={handleEditEducationalInfo}
                ref={boxRef}
                className="flex flex-col gap-6 p-4 bg-white rounded-md w-full max-w-[500px] dark:bg-grayMedium">
                <div
                    className="flex items-center justify-between pb-2 border-b-2 dark:border-black">
                    <div className="text-lg font-semibold text-primary">
                        Edit educational information
                    </div>
                    <div
                        onClick={() => setShowEducationalInfoModal(false)}
                        className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer">
                        <GrClose size={20}/>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="relative">
                        <Input
                            label="University"
                            name="university"
                            value={inputs.university}
                            handleChange={handleInputsChange}
                            close={universities.length > 0}
                            setUniversities={setUniversities}/> 
                        {universities.length > 0 && (<UniversityList
                            universities={universities}
                            setInputs={setInputs}
                            setUniversities={setUniversities}
                            setClicked={setClicked}/>)}
                    </div>
                    <Input
                        label="Major"
                        name="major"
                        value={inputs.major}
                        handleChange={handleInputsChange}/>
                    <div>
                        <button
                            type="submit"
                            className="bg-primary text-white p-2 rounded-md mt-4 font-medium">
                            Save changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default index;
