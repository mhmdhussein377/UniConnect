import {BiHash} from "react-icons/bi";
import Header from "./../../components/Header";
import Member from "./../../components/Member"
import {useState} from "react";

const index = () => {

    const [isFollowedStates,
        setIsFollowedStates] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ]);

    const toggleIsFollowed = (index) => {
        const updatedStates = [...isFollowedStates]
        updatedStates[index] = !updatedStates[index]
        setIsFollowedStates(updatedStates)
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header profile={true}/>
            <div className="bg-gray-100 py-6 h-full flex-1">
                <div
                    className="w-full max-w-[1200px] mx-auto px-8 flex flex-col min-[980px]:flex-row gap-4">
                    <div className="flex-[7] flex flex-col gap-6">
                        <div className="bg-white drop-shadow-lg rounded-md p-4 flex flex-col">
                            <div className="flex items-center gap-2 w-full">
                                <div>
                                    <BiHash size={80}/>
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="text-2xl font-medium">Community Name</div>
                                    <div className="w-full flex items-center justify-between">
                                        <div>1 Member</div>
                                        <div>
                                            <button className="bg-primary text-white px-2 py-1.5 rounded-md">
                                                Request to join
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white drop-shadow-lg rounded-md p-4 flex flex-col gap-2">
                            <div className="text-xl font-semibold">About</div>
                            <p className="text-[15px]">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ducimus ab
                                cum obcaecati deleniti numquam est mollitia consequatur animi, dolor quasi.
                                Incidunt dolorum perspiciatis omnis ex exercitationem reprehenderit facere.
                                Temporibus?
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex-[5] bg-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3 h-fit max-h-[500px] overflow-scroll overflow-x-hidden scrollbar-hide">
                        <div className="font-medium text-lg">Members</div>
                        <div className="flex flex-col gap-2">
                            {isFollowedStates.map((isFollowed, index) => (<Member key={index} searched={true} isFollowed={isFollowed} onToggleIsFollowed={() => toggleIsFollowed(index)} />))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;
