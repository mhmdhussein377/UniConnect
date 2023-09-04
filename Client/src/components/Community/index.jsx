import {BiHash} from "react-icons/bi";

const index = ({highlight}) => {
    return (
        <div
            className={`px-4 py-3 flex justify-between w-full cursor-pointer border-l-[3px] ${highlight && "bg-[#E4F0FA] border-l-primary"}`}>
            <div className="flex items-center gap-2">
                <div
                    className="w-[45px] h-[45px] rounded-full flex items-center justify-center overflow-hidden bg-grayHard bg-opacity-70">
                    <BiHash color="white" size={30}/>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div className={`font-medium text-[18px] ${highlight && "text-primary"}`}>
                        Public Community
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end justify-center">
                <p className="text-[14px] text-[#737373]">Just now</p>
                <div
                    className="w-[20px] h-[20px] bg-primary rounded-full flex items-center justify-center text-white text-sm">
                    5
                </div>
            </div>
        </div>
    );
};

export default index;
