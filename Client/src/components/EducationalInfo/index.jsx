import { HiPencil } from "react-icons/hi";

const index = () => {
    return (
        <div
            className="flex-[3] bg-white drop-shadow-lg max-w-full p-4 rounded-md h-fit flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between font-semibold text-lg">
                    Educational Information
                    <HiPencil className="cursor-pointer" size={30}/>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex">
                        <div className="w-[100px] font-medium">University</div>
                        <span
                            className="text-gray-500 max-w-[270px] overflow-hidden text-ellipsis whitespace-nowrap">
                            University of Toronto
                        </span>
                    </div>
                    <div className="flex">
                        <div className="w-[100px] font-medium">Major</div>
                        <span className="text-gray-500">Computer Science</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default index