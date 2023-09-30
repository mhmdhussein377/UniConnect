import {Fragment, useContext, useEffect, useState} from "react";
import {AiOutlineSearch} from "react-icons/ai";
import {IoIosCloseCircleOutline} from "react-icons/io";
import Member from "../Member"
import SearchedCommunity from "./../SearchedCommunity"
import {getRequest} from "./../../utils/requests"
import {AuthContext} from "../../Context/AuthContext";
import {useDebounce} from "use-debounce";

const index = () => {

    const {user: currentUser} = useContext(AuthContext)

    const [searchTerm,
        setSearchTerm] = useState("");
    const [debouncedValue] = useDebounce(searchTerm, 500);
    const [result,
        setResult] = useState([])

    useEffect(() => {
        const searchUsers = async() => {
            const response = await getRequest(`/user/search/${searchTerm}`);
            let users,
                communities = [];
            if (response) {
                users = response
                    .results[0]
                    .filter((user) => user._id !== currentUser._id);
                communities = response.results[1];
            }

            if (response && (users.length > 0 || communities.length > 0)) {
                setResult([
                    ...users,
                    ...communities
                ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
            }
        }
        if (searchTerm !== "") {
            searchUsers()
        } else {
            setResult([])
        }
    }, [debouncedValue])

    return (
        <Fragment>
            <div
                className="flex items-center gap-3 w-[100%] h-[42px] rounded-md px-2 border-[2px] border-primary relative dark:border-white">
                <AiOutlineSearch className="text-[#2C3E4B] dark:text-white" size={30}/>
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-full w-full bg-transparent border-none outline-none placeholder:text-[#2C3E4B] placeholder:font-medium dark:placeholder:text-white dark:text-white"
                    type="text"
                    placeholder="Search for communities or users"/>{" "} 
                    {searchTerm.length > 0 && (<IoIosCloseCircleOutline
                    className="cursor-pointer dark:text-white"
                    onClick={() => {
                    setSearchTerm("");}}
                    size={30}/>)}
                <div
                    className={`search absolute top-[60px] bg-white z-[99] rounded-md px-4 py-2 flex flex-col gap-2 max-h-[400px] w-full left-0 sm:w-[200%] sm:-left-[50%] smd:w-[170%] smd:-left-[35%] md:w-[150%] md:-left-[25%] lg:w-[140%] lg:-left-[20%] xl:w-full xl:left-0 overflow-scroll scrollbar-hide dark:bg-gray-100 ${result.length > 0
                    ? "visible"
                    : "invisible"}`}>
                    {result.map((item, index) => {
                        if (item.type === "user") {
                            return (
                                <div
                                    key={index} onClick={() => {setResult([]); setSearchTerm("");}}>
                                    <Member member={item}/>
                                </div>
                            );
                        } else if (item.type === "community") {
                            const {name, privacy, _id, creatorUsername} = item;
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                    setResult([]);
                                    setSearchTerm("")}}>
                                    <SearchedCommunity
                                        name={name}
                                        privacy={privacy}
                                        id={_id}
                                        creatorUsername={creatorUsername}/>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </Fragment>
    );
};

export default index;
