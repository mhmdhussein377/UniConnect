import {useContext, useEffect, useRef, useState} from "react";
import {handleCloseModal} from "../../../../utils/closeModal";
import {GrClose} from "react-icons/gr";
import Skill from "./../Skill"
import { AuthContext } from "../../../../Context/AuthContext";
import { postRequest } from "../../../../utils/requests";

const index = ({setShowSkillsModal, skills}) => {

    const { dispatch } = useContext(AuthContext);

    let [selectedSkills, setSelectedSkills] = useState([]);
    let [skillInput, setSkillInput] = useState("");
    const boxRef = useRef();

    useEffect(() => {
        setSelectedSkills(skills);
    }, [skills]);

    const handleRemoveSkill = (removedIndex) => {
        setSelectedSkills(prev => prev.filter((skill, index) => index !== removedIndex))
    }

    const handleAddSkill = (e) => {
        e.preventDefault()

        if (skillInput !== "") {
            setSelectedSkills([skillInput, ...selectedSkills])
            setSkillInput("")
        }
    }

    const handleEditSkills = async() => {
        dispatch({ type: "EDIT_SKILLS", payload: selectedSkills });
        setShowSkillsModal(false);

        await postRequest("/user/edit-profile", { skills: selectedSkills });
    }

    const closeModal = (e) => handleCloseModal(e, boxRef, setShowSkillsModal);

    return (
        <div
            onClick={closeModal}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/40 dark:bg-black/60 z-50 flex items-center justify-center px-2  overflow-hidden max-h-screen">
            <div
                ref={boxRef}
                className="flex flex-col gap-6 p-4 bg-white dark:bg-grayMedium rounded-md w-full max-w-[650px]">
                <div className="flex items-center justify-between pb-2 border-b-2 dark:border-black">
                    <div className="text-lg font-semibold text-primary">Edit your skills</div>
                    <div
                        onClick={() => setShowSkillsModal(false)}
                        className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer">
                        <GrClose size={20}/>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <form onSubmit={handleAddSkill} className="flex gap-2 p-2 rounded-md border-2 dark:border-black">
                        <input
                            className="placeholder:text-gray-500 font-medium flex-1 outline-none bg-transparent"
                            type="text"
                            placeholder="Add skills"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}/>
                    </form>
                    {selectedSkills.length > 0 && (
                        <div
                            className="flex items-center flex-wrap gap-4 py-3.5 max-h-[300px] overflow-y-scroll overflow-x-hidden scrollbar-hide">
                            {selectedSkills.map((skill, index) => (<Skill
                                index={index}
                                key={index}
                                inModal={true}
                                skill={skill}
                                remove={true}
                                handleRemoveSkill={handleRemoveSkill}/>))}
                        </div>
                    )}
                    <div>
                        <button
                            onClick={handleEditSkills}
                            className="bg-primary text-white p-2 rounded-md mt-4 font-medium">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default index