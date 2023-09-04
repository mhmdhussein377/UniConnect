import {BsHash, BsDot, BsEmojiSmile, BsFillSendFill} from "react-icons/bs";
import {GrAttachment} from "react-icons/gr";
import {CgSidebarOpen} from "react-icons/cg";
import {FiUserPlus} from "react-icons/fi";

const index = () => {

    const newCommunity = false;

    const handleSendMessage = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex-[8.8] flex flex-col h-full">
            <div
                className="flex items-center justify-between px-4 py-1.5 border-b-[2px] border-grayHard">
                <div className="flex flex-col items-center">
                    <div
                        className="flex items-center gap-2 font-medium text-lg rounded-md px-2 py-1 cursor-pointer transition bg-gray-200 hover:bg-gray-300">
                        <BsHash size={25}/>
                        First Community
                    </div>
                    <div className="flex items-center">
                        <span>1 member</span>
                        <span>
                            <BsDot size={25}/>
                        </span>
                        <span className="text-[#007D76] font-medium">1 online</span>
                    </div>
                    <CgSidebarOpen className="lg:hidden" size={30}/>
                </div>
                {newCommunity && (
                    <div
                        className="h-full flex flex-col gap-6 items-center justify-center text-center">
                        <div className="text-center flex flex-col gap-2">
                            <h1 className="text-4xl font-semibold">
                                Great, You have a community already!
                            </h1>
                            <p className="text-xl text-[#3A4C58] font-medium">
                                Let{"'"}s start with basics. What would you like to do first?
                            </p>
                        </div>
                        <div
                            className="py-3 px-4 text-2xl border-2 border-[#CECECE] rounded-md flex items-center gap-4 text-center">
                            <div className="border-2 p-2 rounded-md bg-primary">
                                <FiUserPlus className="text-white" size={25}/>
                            </div>
                            Invite people to the community
                        </div>
                    </div>
                )}
                {!newCommunity && (
                    <div
                        className="flex-grow w-full bg-[#F4F3FC] max-h-full overflow-y-scroll scrollbar-hide px-6 py-2">
                        <div className={`flex gap-2 mt-4`}>
                            <div
                                className="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center">
                                <img
                                    src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                                    alt="profile-picture"/>
                            </div>
                            <div className="flex flex-col max-w-[60%]">
                                <div className={`flex items-center justify-between`}>
                                    <div>Jasmine Smith</div>
                                    <div className="text-sm">Today 5:54 AM</div>
                                </div>
                                <div className={`px-4 py-2 bg-primary text-white rounded-md`}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, facere iste
                                    eaque nam nobis a dolor voluptates voluptatem, labore magni deserunt quis
                                    aspernatur soluta suscipit incidunt itaque qui ullam. Provident?
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {!newCommunity && (
                    <form
                        onSubmit={handleSendMessage}
                        className="w-full flex items-center px-6 py-5 bg-[#F4F3FC]">
                        <div
                            className="flex items-center gap-4 pr-4 flex-1 h-[50px] rounded-tl-md rounded-bl-md overflow-hidden bg-white ">
                            <input
                                className="flex-1 h-[100%] px-4 border-none outline-none bg-transparent placeholder:text-[#737373] placeholder:font-medium"
                                type="text"
                                placeholder="Send a message"/>
                            <GrAttachment className="cursor-pointer" size={25}/>
                            <BsEmojiSmile className="cursor-pointer" size={25}/>
                        </div>
                        <button
                            type="submit"
                            className="h-[50px] px-4 sm:px-10 py-2 bg-primary text-white rounded-tr-md rounded-br-md flex items-center justify-center gap-3 text-lg font-medium">
                            <BsFillSendFill size={20}/>
                            Send
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default index;
