import {MdOutlineClose} from "react-icons/md";
import {BiHash} from "react-icons/bi";
import {BsChevronDown, BsChevronUp} from "react-icons/bs";
import {GoPlus} from "react-icons/go";
import Member from "./../Member"
import {Link} from "react-router-dom";
import {useState} from "react";

const index = ({openCommunityDetails, setOpenCommunityDetails}) => {

    let [isAboutOpened,
        setIsAboutOpened] = useState(true)
    let [isMembersListOpened,
        setIsMembersListOpened] = useState(true)

    return (
        <div
            className={`absolute top-0 bg-white communit-details h-screen w-[80%] xs:w-[70%] sm:w-[55%] smd:w-[48%] md:w-[42%] lg:w-[35%] xl:w-[27%] z-50 transition-all duration-300 ease-linear border-l-[2px] ${openCommunityDetails
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
                    <Link>
                        <BiHash size={60}/>
                    </Link>
                    <Link className="text-2xl">First Community</Link>
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
                    <p>Design and development of the new chat application</p>
                )}
            </div>
            <div className="flex flex-col gap-4 px-4 py-4">
                <div
                    className="flex items-center justify-between py-4 border-t-2 border-grayHard select-none">
                    Members
                    <div className="flex items-center gap-4">
                        <div className="flex items-center cursor-pointer text-primary font-medium select-none">
                            <GoPlus size={20}/>
                            Add Members
                        </div>
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
                        <Member/>
                        <Member/>
                        <Member/>
                        <Member/>
                        <Member/>
                        <Member/>
                        <Member/>
                        <Member/>
                        <Member/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default index;
