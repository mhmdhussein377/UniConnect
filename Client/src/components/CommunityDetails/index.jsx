import {MdOutlineClose} from "react-icons/md";
import {BiHash} from "react-icons/bi";
import {BsChevronDown, BsChevronUp} from "react-icons/bs";
import {AiTwotoneLock} from "react-icons/ai";
import {GoPlus} from "react-icons/go";
import Member from "./../Member"
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../Context/AuthContext";

const index = ({openCommunityDetails, setOpenCommunityDetails, setShowAddMembersModal, community}) => {

    const {user} = useContext(AuthContext)

    let [isAboutOpened,
        setIsAboutOpened] = useState(true)
    let [isMembersListOpened,
        setIsMembersListOpened] = useState(true)
    const [communityInfo, setCommunityInfo] = useState(null)

    useEffect(() => {
        setCommunityInfo(community)
    }, [community])

    return (
        <div
            className={`absolute top-0 bg-white dark:bg-black dark:text-white communit-details h-screen w-[80%] xs:w-[70%] sm:w-[55%] smd:w-[48%] md:w-[42%] lg:w-[35%] xl:w-[27%] z-50 transition-all duration-300 ease-linear border-l-[2px] ${openCommunityDetails
            ? "right-0"
            : "-left-full"}`}>
            <div className="pb-4 border-b-2 border-grayHard">
                <div className="flex items-center justify-end pr-4 py-4 pb-1">
                    <MdOutlineClose
                        onClick={() => setOpenCommunityDetails((prev) => !prev)}
                        className="cursor-pointer"
                        size={30}/>
                </div>
                <div className="flex flex-col items-center">
                    <Link to={`/community/${communityInfo?._id}`}>
                        {communityInfo?.privacy === "public" ? <BiHash size={60}/> : <AiTwotoneLock size={60} /> }
                    </Link>
                    <Link to={`/community/${communityInfo?._id}`} className="text-2xl">{communityInfo?.name}</Link>
                </div>
            </div>
            <div className="flex flex-col gap-4 px-4 pt-4">
                <div className="flex items-center justify-between">
                    About{" "} {isAboutOpened
                        ? (<BsChevronUp
                            onClick={() => setIsAboutOpened(!isAboutOpened)}
                            size={20}
                            className="cursor-pointer"/>)
                        : (<BsChevronDown
                            onClick={() => setIsAboutOpened(!isAboutOpened)}
                            size={20}
                            className="cursor-pointer"/>)}
                </div>
                {isAboutOpened && (
                    <p>{communityInfo?.description}</p>
                )}
            </div>
            <div className="flex flex-col gap-4 px-4 py-4">
                <div
                    className="flex items-center justify-between py-4 border-t-2 border-grayHard select-none">
                    Members
                    <div className="flex items-center gap-4">
                        {user._id === communityInfo?.creator._id && <div onClick={() => {setShowAddMembersModal(true); setOpenCommunityDetails(false)}} className="flex items-center cursor-pointer text-primary font-medium select-none">
                            <GoPlus size={20}/>
                            Add Members
                        </div>}
                        {isMembersListOpened
                            ? (<BsChevronUp
                                onClick={() => setIsMembersListOpened(!isMembersListOpened)}
                                size={20}
                                className="cursor-pointer"/>)
                            : (<BsChevronDown
                                onClick={() => setIsMembersListOpened(!isMembersListOpened)}
                                size={20}
                                className="cursor-pointer"/>)}
                    </div>
                </div>
                {isMembersListOpened && (
                    <div
                        className="flex flex-col gap-2 w-full max-h-[300px] overflow-scroll scrollbar-hide">
                        {communityInfo && <Member creator={true} member={communityInfo?.creator} />}
                        {communityInfo?.members.map((member, index) => (
                            <Member key={index} member={member} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default index;
