import Header from "./../../components/Header"
import {HiPencil} from "react-icons/hi";
import UserDataSection from "./../../components/UserDataSection"

const index = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <Header profile={true}/>
            <div className="bg-gray-100 py-6 h-full flex-1">
                <div
                    className="w-full max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-[7] flex flex-col gap-6">
                        {/* USER DATA SECTION */}
                        <UserDataSection />
                        {/* BIO */}
                        <div className="bg-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3">
                            <div className="text-xl font-semibold">About</div>
                            <p className="text-[15px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dolore corrupti laudantium cupiditate, iure eum explicabo voluptatum impedit non, obcaecati ipsa distinctio minima aspernatur alias modi! Iste voluptatem provident inventore!</p>
                        </div>
                    </div>
                    <div className="flex-[3] bg-white drop-shadow-lg max-w-full p-4 rounded-md h-fit flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between font-semibold text-lg">
                                Educational Information
                                <HiPencil className="cursor-pointer" size={30} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex">
                                    <div className="w-[100px] font-medium">
                                        University
                                    </div>
                                    <span className="text-gray-500 max-w-[270px] overflow-hidden text-ellipsis whitespace-nowrap">University of Toronto</span>
                                </div>
                                <div className="flex">
                                    <div className="w-[100px] font-medium">Major</div>
                                    <span className="text-gray-500">Computer Science</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default index