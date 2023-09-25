import {useState} from "react";
import {BsChevronDown, BsChevronUp} from "react-icons/bs";
import SearchedCommunity from "./../../components/SearchedCommunity"

const index = ({text, data, maxDataToShow, withoutUsername}) => {

    const [showAllData,
        setShowAllData] = useState(false)

    return (
        <div
            className="bg-white dark:bg-black dark:text-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3">
            <div className="text-xl font-semibold flex items-center justify-between">
                {text}
            </div>
            <div className="flex flex-col gap-4">
                {data
                    .slice(0, showAllData
                    ? data
                        ?.length
                        : maxDataToShow)
                    .map((comm, index) => {
                        const {name, privacy, _id} = comm;
                        const {username} = comm.creator;
                        return (
                            <div key={index} className="pb-2 border-b border-b-3 border-b-gray-300">
                                <SearchedCommunity
                                    withoutUsername={withoutUsername}
                                    name={name}
                                    privacy={privacy}
                                    id={_id}
                                    creatorUsername={username}/>
                            </div>
                        );
                    })}
            </div>
            {data
                ?.length > maxDataToShow && (
                    <div>
                        {showAllData
                            ? (
                                <button
                                    onClick={() => setShowAllData((prev) => !prev)}
                                    className="text-[16px] font-medium text-primary flex items-center gap-2">
                                    Show less
                                    <BsChevronUp/>
                                </button>
                            )
                            : (
                                <button
                                    onClick={() => setShowAllData((prev) => !prev)}
                                    className="text-[16px] font-medium text-primary flex items-center gap-2">
                                    Show more
                                    <BsChevronDown/>
                                </button>
                            )}
                    </div>
                )}
        </div>
    );
}

export default index