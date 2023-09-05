import {useState} from "react";
import Header from "./../../components/Header"
import Sidebar from "./../../components/Sidebar"
import CommunityConversation from "./../../components/CommunityConversation"
import PrivateConversation from "./../../components/PrivateConversation"

const index = () => {

    let [type,
        setType] = useState("community");

    return (
        <div className="h-screen max-h-screen">
            <Header/>
            <div className="flex relative home-bottom">
                <Sidebar setType={setType} type={type}/> 
                {type === "community" && (<CommunityConversation/>)}
                {type === "inbox" && <PrivateConversation />}
            </div>
        </div>
    );
}

export default index