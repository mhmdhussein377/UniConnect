import {BsChevronDown, BsChevronUp} from "react-icons/bs";
import {GrClose} from "react-icons/gr";
import {handleCloseModal} from "../../../../utils/closeModal";
import {useContext, useEffect, useRef, useState} from "react";
import {languagesData} from "./../../../../utils/LanguagesData"
import Language from "./../Language"
import { postRequest } from "../../../../utils/requests";
import { AuthContext } from "../../../../Context/AuthContext";

const index = ({setShowLanguagesModal, languages}) => {

    const { dispatch } = useContext(AuthContext);

    const [selectedLanguages, setSelectedLanguages] = useState([]);
    let [showLanguagesList, setShowLanguagesList] = useState(false);
    const boxRef = useRef();

    useEffect(() => {
        setSelectedLanguages(languages)
    }, [languages])

    const handleLanguageChange = (e) => {
        const language = e.target.value;
        const isChecked = e.target.checked;

        if(isChecked) {
            setSelectedLanguages([
                ...selectedLanguages,
                language
            ])
        }else {
            setSelectedLanguages(selectedLanguages.filter(lang => lang !== language))
        }
    }

    const handleEditLanguages = async() => {
        dispatch({type: "EDIT_LANGUAGES", payload: selectedLanguages});
        setShowLanguagesModal(false)

        await postRequest("/user/edit-profile", {languages: selectedLanguages})
    }

    const closeModal = (e) => handleCloseModal(e, boxRef, setShowLanguagesModal);

    return (
        <div
            onClick={closeModal}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/40 z-50 flex items-center justify-center px-2 overflow-hidden max-h-screen">
            <div
                ref={boxRef}
                className="flex flex-col gap-6 p-4 bg-white rounded-md w-full max-w-[500px]">
                <div className="flex items-center justify-between pb-2 border-b-2">
                    <div className="text-lg font-semibold">Edit languages</div>
                    <div
                        onClick={() => setShowLanguagesModal(false)}
                        className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer">
                        <GrClose size={20}/>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="relative flex flex-col gap-1 mt-2">
                        <label className="text-4 font-medium" htmlFor="languages">
                            Languages
                        </label>
                        <div
                            onClick={() => setShowLanguagesList((prev) => !prev)}
                            className="p-2 rounded-md border-2 flex items-center justify-between cursor-pointer select-none">
                            Select languages
                            <div className="flex items-center justify-center">
                                {showLanguagesList
                                    ? (<BsChevronUp size={20}/>)
                                    : (<BsChevronDown size={20}/>)}
                            </div>
                        </div>
                        {showLanguagesList && (
                            <div
                                className="absolute w-full left-0 right-0 top-20 p-2 rounded-md border-2 bg-white flex flex-col gap-1 max-h-[300px] overflow-scroll scrollbar-hide">
                                {languagesData.map((language) => (<Language
                                    key={language.id}
                                    label={language.label}
                                    checked={selectedLanguages.includes(language.label)}
                                    onChange={handleLanguageChange}/>))}
                            </div>
                        )}
                        <div className="flex items-center flex-wrap gap-2 mt-2">
                            {selectedLanguages.map((lang, index) => (
                                <div className="py-1 px-4 rounded-md border-2" key={index}>
                                    {lang}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleEditLanguages}
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
