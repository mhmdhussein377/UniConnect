import {useState} from "react";
import {postRequest} from "../../../utils/requests";
import {FiLock} from "react-icons/fi";
import Input from "../components/Input";
import {MdAlternateEmail} from "react-icons/md";
import Button from "../components/Button";
import {Link, useNavigate} from "react-router-dom";

const index = () => {

    let [email,
        setEmail] = useState("");
    let [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleForgotPassword = async(e) => {
        e.preventDefault();

        const response = await postRequest("/forgot-password", {email});
        if(response) {
            navigate("/")
        }else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-[#EEF5FE]">
            <form
                onSubmit={handleForgotPassword}
                className="text-center flex flex-col gap-8 px-6 py-12 bg-white">
                <div className="flex flex-col gap-4">
                    <div
                        className="mx-auto w-[98px] h-[98px] bg-grayLight border-[2px] border-grayMedium rounded-full flex items-center justify-center">
                        <FiLock size={50}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-2xl font-semibold">Reset Password</h3>
                        <p className="text-grayHard text-lg font-normal">
                            Please enter your registered email
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Input
                        handleChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        placeholder="Email"
                        icon={< MdAlternateEmail color = "C1C5C5" size = {
                        27
                    } />}/>
                    {error && <p className="text-danger text-start">User not found</p>}
                </div>
                <div className="flex flex-col gap-3">
                    <Button text={"Send login link"}/>
                    <Link to="/" className="text-start text-primary font-medium">
                        Back to login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default index