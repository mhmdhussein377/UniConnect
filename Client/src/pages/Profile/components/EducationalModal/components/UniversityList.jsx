
import UniversityItem from './UniversityItem';

const UniversityList = ({universities, setInputs, setUniversities, setClicked}) => {
    return (
        <div
            className="absolute w-full left-0 right-0 top-20 p-2 rounded-md border-2 bg-white flex flex-col gap-1 max-h-[300px] overflow-scroll scrollbar-hide">
            {universities.map((university, index) => (<UniversityItem
                key={index}
                university={university}
                setInputs={setInputs}
                setUniversities={setUniversities}
                setClicked={setClicked}/>))}
        </div>
    );
};

export default UniversityList;
