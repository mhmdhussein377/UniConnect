import {useState} from "react";
import {BsChevronDown, BsChevronUp} from "react-icons/bs";
import {HiPencil} from "react-icons/hi";
import Button from "../ShowCommunites/UI/Button";

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
                <div>{text}</div>
                {currentUser && (<HiPencil
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer"
                    size={30}/>)}
            </div>
            <div className="flex flex-col gap-4">
                {data
                    ?.length > 0
                        ? (data.slice(0, showAllData
                            ? data
                                ?.length
                                : maxDataToShow).map((item, index) => (
                            <div key={index} className="pb-2 border-b border-b-3 border-b-gray-300">
                                {item}
                            </div>
                        )))
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
