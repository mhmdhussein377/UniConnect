import Header from "./../../components/Header"
import EducationalInfo from "./../../components/EducationalInfo"
import UserDataSection from "./../../components/UserDataSection"
import About from "./../../components/About"
import SkillsLanguagesSection from "./../../components/SkillsLanguagesSection"
import {useContext, useState} from "react"
import {AuthContext} from "./../../Context/AuthContext"
import ShowCommunities from "./../../components/ShowCommunites"
import ShowFriends from "./../../components/ShowFriends"
// MODALS
import EducationalModal from './components/EducationalModal'
import EditUserModal from './components/EditUserModal'
import LanguagesModal from "./components/LanguagesModal"
import SkillsModal from "./components/SkillsModal"
import {useParams} from "react-router-dom"

const index = () => {

    const {user} = useContext(AuthContext)
    const {username} = useParams()

    let [showEducationalInfoModal,
        setShowEducationalInfoModal] = useState(false);
    let [showEditUserModal,
        setShowEditUserModal] = useState(false)
    let [showLanguagesModal,
        setShowLanguagesModal] = useState(false)
    let [showSkillsModal,
        setShowSkillsModal] = useState(false);

    let {joinedCommunities, createdCommunities, friends} = user
    let {skills, languages, bio, university, major} = user.profile

    console.log(user)

    return (
        <div className="flex flex-col min-h-screen">
            <Header profile={true}/>
            <div className="bg-gray-100 py-6 h-full flex-1">
                <div
                    className="w-full max-w-[1200px] mx-auto px-8 flex flex-col lg:flex-row gap-4">
                    <div className="lg:flex-[4] xl:flex-[8] flex flex-col gap-6">
                        {user && (<UserDataSection
                            isCurrentUser={user
                            ?.usrname === username}
                            user={user}
                            setShowEditUserModal={setShowEditUserModal}/>)}
                        {bio && <About data={bio}/>}
                        <SkillsLanguagesSection
                            setShowModal={setShowSkillsModal}
                            text="Skills"
                            data={skills}
                            maxDataToShow={4}
                            currentUser={user
                            ?.usrname === username}
                            emptyHeadline="Your skills will shine here."/>
                        <SkillsLanguagesSection
                            setShowModal={setShowLanguagesModal}
                            text="Languages"
                            data={languages}
                            maxDataToShow={4}
                            currentUser={user
                            ?.usrname === username}
                            emptyHeadline="Your multilingual talengts await."/>
                        {createdCommunities
                            ?.length > 0 && (<ShowCommunities
                                withoutUsername={true}
                                text={"Created communities"}
                                maxDataToShow={4}
                                data={createdCommunities}/>)}
                        {joinedCommunities
                            ?.length > 0 && (<ShowCommunities
                                text={"Joined communities"}
                                maxDataToShow={4}
                                data={joinedCommunities}/>)}
                    </div>
                    <div className="lg:flex-[3] xl:flex-[4.5] flex flex-col gap-6">
                        <EducationalInfo
                            currentUser={user
                            ?.usrname === username}
                            university={university}
                            major={major}
                            setShowEducationalInfoModal={setShowEducationalInfoModal}
                            emptyHeadline="Share your university and major to showcase your academic background."/>
                        <ShowFriends friends={friends} />
                    </div>
                </div>
            </div>
            {showEducationalInfoModal && (<EducationalModal setShowEducationalInfoModal={setShowEducationalInfoModal}/>)}
            {showEditUserModal && (<EditUserModal setShowEditUserModal={setShowEditUserModal}/>)}
            {showLanguagesModal && (<LanguagesModal
                languages={languages}
                setShowLanguagesModal={setShowLanguagesModal}/>)}
            {showSkillsModal && (<SkillsModal skills={skills} setShowSkillsModal={setShowSkillsModal}/>)}
        </div>
    );
}

export default index