import {BsHash, BsDot, BsEmojiSmile, BsFillSendFill} from "react-icons/bs";
import {GrAttachment} from "react-icons/gr";
import {CgSidebarOpen} from "react-icons/cg";
import {FiUserPlus} from "react-icons/fi";
import Message from "./../Message"
import { useState } from "react";

const index = ({setOpenCommunityDetails, setShowAddMembersModal, setOpenSidebar, communityConversation}) => {

    const newCommunity = false;

    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(()  => {
        setMessages(communityConversation?.chat)
    }, [communityConversation?.chat])

    let onlineUsers = communityConversation?.members.reduce((count, member) => {
        if(member.online) {
            return count + 1
        }
        return count
    }, 0)
    if(communityConversation?.creator.online) {
        onlineUsers += 1;
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex-[8.8] flex flex-col h-full">
            <div
                className="flex items-center justify-between px-4 py-1.5 border-b-[2px] border-grayHard">
                <div className="flex flex-col items-center">
                    <div
                        onClick={() => setOpenCommunityDetails((prev) => !prev)}
                        className="flex items-center gap-2 font-medium text-lg rounded-md px-2 py-1 cursor-pointer transition bg-gray-200 hover:bg-gray-300 select-none">
                        <BsHash size={25}/>
                        First Community
                    </div>
                    <div className="flex items-center">
                        <span className="">1 member</span>
                        <span>
                            <BsDot size={25}/>
                        </span>
                        <span className="text-[#007D76] font-medium">1 online</span>
                    </div>
                </div>
                <CgSidebarOpen onClick={() => setOpenSidebar(prev => !prev)} className="lg:hidden" size={30}/>
            </div>
            {newCommunity && (
                <div
                    className="h-full flex flex-col gap-6 items-center justify-center text-center">
                    <div className="text-center flex flex-col gap-2">
                        <h1 className="text-4xl font-semibold">
                            Great, You have a community already!
                        </h1>
                        <p className="text-xl text-[#3A4C58] font-medium">
                            Lets start with basics. What would you like to do first?
                        </p>
                    </div>
                    <div
                        onClick={() => setShowAddMembersModal(true)}
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
                    <Message own={"yes"} communitMessage={true}/>
                    <Message communitMessage={true}/>
                    <Message own={"yes"} communitMessage={true}/>
                    <Message communitMessage={true}/>
                    <Message own={"yes"} communitMessage={true}/>
                    <Message own={"yes"} communitMessage={true}/>
                    <Message communitMessage={true}/>
                    <Message own={"yes"} communitMessage={true}/>

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
    );
};

export default index;
