import Header from "./../../components/Header";
import EducationalInfo from "./../../components/EducationalInfo";
import UserDataSection from "./../../components/UserDataSection";
import About from "./../../components/About";
import SkillsLanguagesSection from "./../../components/SkillsLanguagesSection";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./../../Context/AuthContext";
import {useParams} from "react-router-dom";
import {getRequest} from "./../../utils/requests"

const index = () => {

    const {username} = useParams()
    const {user: currentUser} = useContext(AuthContext)
    let [user, setUser] = useState({})
    
    useEffect(() => {
        const getUser = async() => {
            const response = await getRequest(`/user/${username}`)
            response && setUser(response.user)
        }
        getUser()
    }, [username, user._id])

    return (
        <div className="flex flex-col min-h-screen">
            <Header profile={true}/>
            <div className="bg-gray-100 py-6 h-full flex-1">
                <div
                    className="w-full max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-[7] flex flex-col gap-6">
                        {user && (<UserDataSection
                            isCurrentUser={user.username === currentUser.username}
                            user={user}/>)}
                        {user?.profile?.bio && <About data={user?.profile?.bio}/>}
                        {user?.profile?.skills.length > 0 && <SkillsLanguagesSection
                            text="Skills"
                            data={user?.profile?.skills}
                            maxDataToShow={4}
                            currentUser={user.username === currentUser.username}
                            emptyHeadline="Your skills will shine here."/>}
                        {user?.profile?.languages.length > 0 && <SkillsLanguagesSection
                            text="Languages"
                            data={user
                            ?.profile
                                ?.languages}
                            maxDataToShow={4}
                            currentUser={user.username === currentUser.username}
                            emptyHeadline="Your multilingual talengts await."/>}
                    </div>
                    <EducationalInfo
                        currentUser={user.username === currentUser.username}
                        universtiy={user?.profile?.universtiy}
                        major={user?.profile?.major}
                        emptyHeadline="No educational background available"/>
                </div>
            </div>
        </div>
    );
};

export default index;
