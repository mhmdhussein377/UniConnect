import Header from "./../../components/Header"
import EducationalInfo from "./../../components/EducationalInfo"
import UserDataSection from "./../../components/UserDataSection"
import About from "./../../components/About"
import SkillsLanguagesSection from "./../../components/SkillsLanguagesSection"
// MODALS
import EducationalModal from './components/EducationalModal'
import { useState } from "react"

const index = () => {

    let [showEducationalInfoModal,
        setShowEducationalInfoModal] = useState(1);

    const skills = [
        "HTML",
        "CSS",
        'Javascript',
        "React",
        "Express",
        "MongoDB"
    ]

    const languages = ["Arabic", "English", "German"]

    return (
        <div className="flex flex-col min-h-screen">
            <Header profile={true}/>
            <div className="bg-gray-100 py-6 h-full flex-1">
                <div
                    className="w-full max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-[7] flex flex-col gap-6">
                        <UserDataSection/>
                        <About/>
                        <SkillsLanguagesSection
                            text="Skills"
                            data={skills}
                            maxDataToShow={4}
                            emptyHeadline="Your skills will shine here."/>
                        <SkillsLanguagesSection
                            text="Languages"
                            data={languages}
                            maxDataToShow={4}
                            emptyHeadline="Your multilingual talengts await."/>
                    </div>
                    <EducationalInfo/>
                </div>
            </div>
            {showEducationalInfoModal && <EducationalModal setShowEducationalInfoModal={setShowEducationalInfoModal} />}
        </div>
    );
}

export default index