import {MdOutlineClose} from "react-icons/md";
import Member from "./../Member"

const index = ({setShowAddMembersModal}) => {
    return (
        <div
            className={`flex items-center justify-center absolute top-0 left-0 w-full h-screen bg-black/60 z-[20] px-4`}>
            <div
                className="bg-white w-full max-w-[550px] min-h-[400px] p-4 rounded-md flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-lg font-medium" htmlFor="add-members">
                            Add members
                        </label>
                        <MdOutlineClose
                            onClick={() => setShowAddMembersModal(false)}
                            className="cursor-pointer"
                            size={25}/>
                    </div>
                    <input
                        id="add-members"
                        type="text"
                        placeholder="Search for users to add"
                        className="border-b-2 border-b-primary outline-none px-2 placeholder:text-lg"/>
                </div>
                <div
                    className="flex flex-col gap-2 max-h-[300px] overflow-scroll scrollbar-hide">
                    <Member inModal={true}/>
                    <Member inModal={true}/>
                    <Member inModal={true}/>
                    <Member inModal={true}/>
                    <Member inModal={true}/>
                    <Member inModal={true}/>
                    <Member inModal={true}/>
                    <Member inModal={true}/>
                    <Member inModal={true}/>
                </div>
            </div>
        </div>
    );
};

export default index;
