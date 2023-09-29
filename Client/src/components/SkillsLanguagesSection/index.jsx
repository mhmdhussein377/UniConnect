import {useState} from "react";
import {BsChevronDown, BsChevronUp} from "react-icons/bs";
import {HiPencil} from "react-icons/hi";
import Button from "../ShowCommunites/UI/Button";
import Skill from "./../../pages/Profile/components/Skill"

const index = ({
    data,
    maxDataToShow,
    text,
    emptyHeadline,
    setShowModal,
    currentUser
}) => {

    const [showAllData,
        setShowAllData] = useState(false);

    return (
        <div
            className="bg-white dark:bg-black dark:text-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3">
            <div className="text-xl font-semibold flex items-center justify-between">
                <div className="text-primary">{text}</div>
                {currentUser && (<HiPencil
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer"
                    size={30}/>)}
            </div>
            <div
                className="flex items-center flex-wrap gap-4 py-3.5 overflow-x-hidden">
                {data
                    ?.length > 0
                        ? (data.slice(0, showAllData
                            ? data
                                ?.length
                                : maxDataToShow).map((skill, index) => <Skill key={index} skill={skill}/>))
                        : (
                            <h1 className="my-2 text-lg">{emptyHeadline}</h1>
                        )}
            </div>
            {data
                ?.length > maxDataToShow && (
                    <div>
                        {showAllData
                            ? (
                                <Button
                                    text={"Show less"}
                                    icon={< BsChevronUp />}
                                    setShowAllData={setShowAllData}/>
                            )
                            : (
                                <Button
                                    text={"Show more"}
                                    icon={< BsChevronDown />}
                                    setShowAllData={setShowAllData}/>
                            )}
                    </div>
                )}
        </div>
    );
};

export default index;
