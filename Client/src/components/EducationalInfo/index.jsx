import {useContext} from "react";
import {HiPencil} from "react-icons/hi";
import {AuthContext} from "../../Context/AuthContext";

const index = ({setShowEducationalInfoModal, currentUser, university, major, emptyHeadline}) => {
    console.log(university, major);

    console.log(emptyHeadline)

    return (
        <div
            className="flex-[3] bg-white drop-shadow-lg max-w-full p-4 rounded-md h-fit flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between font-semibold text-lg">
                    Educational Information {currentUser && (<HiPencil
                        onClick={() => setShowEducationalInfoModal(true)}
                        className="cursor-pointer"
                        size={30}/>)}
                </div>
                {major && university
                    ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex">
                                <div className="w-[100px] font-medium">University</div>
                                <span
                                    title="mohammad.hussein377@gmail.commohammad.hussein377@gmail.com"
                                    className="text-gray-500 max-w-[270px] overflow-hidden text-ellipsis whitespace-nowrap">
                                    {university}
                                </span>
                            </div>
                            <div className="flex">
                                <div className="w-[100px] font-medium">Major</div>
                                <span className="text-gray-500">{major}</span>
                            </div>
                        </div>
                    )
                    : (
                        <div className="text-center my-4">{emptyHeadline}</div>
                    )}
            </div>
        </div>
    );
};

export default index