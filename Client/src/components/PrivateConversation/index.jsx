import {GrAttachment} from "react-icons/gr";
import {BsEmojiSmile} from "react-icons/bs";
import {BsFillSendFill} from "react-icons/bs";
import {CgSidebarOpen} from "react-icons/cg";
import Message from "./../Message"

const index = () => {
    return (
        <div className="flex-[8.8] flex flex-col">
            <div
                className="flex items-center justify-between px-4 py-1.5 border-b-[2px] border-grayHard h-[75px]">
                <div className="flex items-center gap-3">
                    <div
                        className="w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center">
                        <img
                            className="cursor-pointer"
                            src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                            alt="profile-picture"/>
                    </div>
                    <div>
                        <div className="cursor-pointer text-lg font-medium">John Doe</div>
                        <p>mhmd_hussein</p>
                    </div>
                </div>
                <CgSidebarOpen className="lg:hidden" size={30}/>
            </div>
            <div
                className="flex-1 flex flex-col px-6 bg-[#F4F3FC] overflow-scroll max-h-[80vh] scrollbar-hide z-10 conversation">
                <Message/>
                <Message own={true}/>
                <Message/>
                <Message/>
                <Message own={true}/>
                <Message/>
            </div>
            <form className="flex items-center mt-auto h-[70px] px-6 bg-[#F4F3FC]">
                <div
                    className="flex items-center gap-4 pr-4 flex-1 h-[50px] rounded-tl-md rounded-bl-md overflow-hidden bg-white">
                    <input
                        className="flex-1 h-[100%] px-4 border-none outline-none bg-transparent placeholder:text-[#737373] placeholder:font-medium"
                        type="text"
                        placeholder="Send a message"/>
                    <GrAttachment size={25}/>
                    <BsEmojiSmile size={25}/>
                </div>
                <button
                    type="submit"
                    className="h-[50px] px-10 py-2 bg-primary text-white rounded-tr-md rounded-br-md flex items-center justify-center gap-3 text-lg font-medium">
                    <BsFillSendFill size={20}/>
                    Send
                </button>
            </form>
        </div>
    );
};

export default index;
