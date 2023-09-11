import {Fragment, useContext, useState} from "react";
import {AiOutlineSearch} from "react-icons/ai";
import {IoIosCloseCircleOutline} from "react-icons/io";
import Member from "../Member"
import SearchedCommunity from "./../SearchedCommunity"
import {getRequest} from "./../../utils/requests"
import { AuthContext } from "../../Context/AuthContext";

const index = () => {

    const {user: currentUser} = useContext(AuthContext)

    let [showSearchList,
        setShowSearchList] = useState(false);
    let [searchTerm,
        setSearchTerm] = useState("");
    let [result, setResult] = useState([])

    const handleSearch = async(e) => {
        e.preventDefault();

        if(searchTerm !== "") {
            const response = await getRequest(`/user/search/${searchTerm}`)
            let users, communities = []
            if(response) {
                users = response.results[0].filter(user => user._id !== currentUser._id)
                communities = response.results[1]
            }
            
            if(response && (users.length > 0 || communities.length > 0)) {
                setResult([...users, ...communities].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)))
                setShowSearchList(true)
            }
        }
    };

    return (
        <Fragment>
            <form
                onSubmit={handleSearch}
                className="flex items-center gap-3 w-[100%] h-[42px] rounded-md px-2 border-[2px] border-primary relative">
                <AiOutlineSearch color="#2C3E4B" size={30}/>
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-full w-full bg-transparent border-none outline-none placeholder:text-[#2C3E4B] placeholder:font-medium"
                    type="text"
                    placeholder="Search for communities or users"/>{" "} {searchTerm.length > 0 && (<IoIosCloseCircleOutline
                    className="cursor-pointer"
                    onClick={() => {
                    setShowSearchList(false);
                    setSearchTerm("");
                }}
                    size={30}/>)}
                <div
                    className={`search absolute top-[60px] bg-white z-[99] rounded-md px-4 py-2 flex flex-col gap-2 max-h-[400px] w-[200%] -left-[50%] smd:w-[170%] smd:-left-[35%] md:w-[150%] md:-left-[25%] lg:w-[140%] lg:-left-[20%] xl:w-full xl:left-0 overflow-scroll scrollbar-hide ${showSearchList
                    ? "visible"
                    : "invisible"}`}>
                    {result && result.map((item, index) => {
                        if(item.type === "user") {
                            return <Member member={item} key={index} />
                        }else if(item.type === "community") {
                            return <SearchedCommunity community={item} key={index} />
                        }
                    })}
                </div>
            </form>
        </Fragment>
    );
};

export default index;
