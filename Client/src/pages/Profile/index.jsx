import Header from "./../../components/Header"
import EducationalInfo from "./../../components/EducationalInfo"
import UserDataSection from "./../../components/UserDataSection"
import About from "./../../components/About"
import SkillsLanguagesSection from "./../../components/SkillsLanguagesSection"
import {useContext, useState} from "react"
import {AuthContext} from "./../../Context/AuthContext"
// MODALS
import EducationalModal from './components/EducationalModal'
import EditUserModal from './components/EditUserModal'
import LanguagesModal from "./components/LanguagesModal"
import SkillsModal from "./components/SkillsModal"

const index = () => {

    const {user} = useContext(AuthContext)

    let [showEducationalInfoModal,
        setShowEducationalInfoModal] = useState(false);
    let [showEditUserModal,
        setShowEditUserModal] = useState(false)
    let [showLanguagesModal,
        setShowLanguagesModal] = useState(false)
    let [showSkillsModal,
        setShowSkillsModal] = useState(false);

    let {skills, languages, bio} = user.profile

    return (
        <div className="flex flex-col min-h-screen">
            <Header profile={true}/>
            <div className="bg-gray-100 py-6 h-full flex-1">
                <div
                    className="w-full max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-[7] flex flex-col gap-6">
                        <UserDataSection setShowEditUserModal={setShowEditUserModal}/>
                        {bio && <About/>}
                        <SkillsLanguagesSection
                            setShowModal={setShowSkillsModal}
                            text="Skills"
                            data={skills}
                            maxDataToShow={4}
                            emptyHeadline="Your skills will shine here."/>
                        <SkillsLanguagesSection
                            setShowModal={setShowLanguagesModal}
                            text="Languages"
                            data={languages}
                            maxDataToShow={4}
                            emptyHeadline="Your multilingual talengts await."/>
                    </div>
                    <EducationalInfo setShowEducationalInfoModal={setShowEducationalInfoModal}/>
                </div>
            </div>
            {showEducationalInfoModal && (<EducationalModal setShowEducationalInfoModal={setShowEducationalInfoModal}/>)}
            {showEditUserModal && (<EditUserModal setShowEditUserModal={setShowEditUserModal}/>)}
            {showLanguagesModal && (<LanguagesModal languages={languages} setShowLanguagesModal={setShowLanguagesModal}/>)}
            {showSkillsModal && (<SkillsModal skills={skills} setShowSkillsModal={setShowSkillsModal}/>)}
        </div>
    );
}

export default index