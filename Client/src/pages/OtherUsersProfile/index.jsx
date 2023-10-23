import Header from "./../../components/Header";
import EducationalInfo from "./../../components/EducationalInfo";
import UserDataSection from "./../../components/UserDataSection";
import About from "./../../components/About";
import SkillsLanguagesSection from "./../../components/SkillsLanguagesSection";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./../../Context/AuthContext";
import {useParams} from "react-router-dom";
import {getRequest, postRequest} from "./../../utils/requests";
import ShowCommunities from "./../../components/ShowCommunites";
import ShowFriends from "./../../components/ShowFriends";
import Member from "./../../components/Member";

const index = () => {
    
    const {username} = useParams();
    const {user: currentUser} = useContext(AuthContext);
    const [user,
        setUser] = useState({});
    const [suggestedUsers,
        setSuggestedUsers] = useState([]);
    const [friends,
        setFriends] = useState([]);

    useEffect(() => {
        const getUser = async() => {
            const response = await getRequest(`/user/${username}`);
            const {user} = response;
            response && setUser(user);
            response && setFriends(user.friends);
        };
        username !== undefined && getUser();
    }, [username]);

    const {createdCommunities, joinedCommunities} = user;

    useEffect(() => {
        const getSuggestedUsers = async() => {
            const response = await postRequest(`/user/suggested-users`, {
                excludedUser: user
                    ?._id
            });
            response && setSuggestedUsers(response);
        };
        user
            ?._id && getSuggestedUsers();
    }, [user
            ?._id]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header profile={true}/>
            <div className="bg-gray-100 py-6 h-full flex-1 dark:bg-grayMedium">
                <div
                    className="w-full max-w-[1200px] mx-auto px-8 flex flex-col lg:flex-row gap-4">
                    <div className="lg:flex-[4] xl:flex-[8] flex flex-col gap-6">
                        {user && (<UserDataSection
                            friends={friends}
                            setFriends={setFriends}
                            isCurrentUser={user.username === currentUser.username}
                            user={user}/>)}
                        {user
                            ?.profile
                                ?.bio && <About
                                    data={user
                                    ?.profile
                                        ?.bio}/>}
                        {< SkillsLanguagesSection
                        text = "Skills"
                        data = {
                            user
                                ?.profile
                                    ?.skills
                        }
                        maxDataToShow = {
                            10
                        }
                        currentUser = {
                            false
                        }
                        emptyHeadline = "No skills found, but this user's got mad mysteries and hidden talents!"
                        />}
                        {< SkillsLanguagesSection
                        text = "Languages"
                        data = {
                            user
                                ?.profile
                                    ?.languages
                        }
                        maxDataToShow = {
                            10
                        }
                        currentUser = {
                            false
                        }
                        emptyHeadline = "User hasn't told us what languages they speak yet."
                        />}
                        {< SkillsLanguagesSection
                        text = {
                            "Hobbies"
                        }
                        data = {
                            user
                                ?.profile
                                    ?.hobbies
                        }
                        maxDataToShow = {
                            10
                        }
                        currentUser = {
                            false
                        }
                        emptyHeadline = {
                            "Still exploring the hobby universe."
                        }
                        />}
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
                            currentUser={user.username === currentUser.username}
                            universtiy={user
                            ?.profile
                                ?.universtiy}
                            major={user
                            ?.profile
                                ?.major}
                            emptyHeadline="No educational background available"/>{" "} {friends && <ShowFriends friends={friends || []}/>}
                        {suggestedUsers.length > 0 && (
                            <div
                                className="bg-white drop-shadow-lg max-w-full p-4 rounded-md h-fit flex flex-col gap-4">
                                <div className="flex flex-col gap-3">
                                    <div className="font-semibold text-lg text-primary">
                                        Suggested friends
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {suggestedUsers.map((friend, index) => (<Member key={index} member={friend}/>))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;
