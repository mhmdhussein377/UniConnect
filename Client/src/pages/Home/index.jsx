import { useState } from "react";
import Header from "./../../components/Header"
import Sidebar from "./../../components/Sidebar"

const index = () => {

    let [type,
        setType] = useState("community");

    return (
        <div className="h-screen max-h-screen">
            <Header/>
            <div className="flex relative home-bottom">
                <Sidebar setType={setType} type={type}/>
            </div>
        </div>
    );
}

export default index