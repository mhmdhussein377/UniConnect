import Header from "./../../components/Header"
import EducationalInfo from "./../../components/EducationalInfo"
import UserDataSection from "./../../components/UserDataSection"
import About from "./../../components/About"

const index = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <Header profile={true}/>
            <div className="bg-gray-100 py-6 h-full flex-1">
                <div
                    className="w-full max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-[7] flex flex-col gap-6">
                        <UserDataSection />
                        <About />
                    </div>
                    <EducationalInfo />
                </div>
            </div>
        </div>
    );
}

export default index