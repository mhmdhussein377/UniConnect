import {useState} from "react";
import Input from "../components/Input";
import {postRequest} from "../../../utils/requests";
import {FiLock} from "react-icons/fi";
import Button from "../components/Button";
import {useParams, useNavigate, Link} from "react-router-dom";

const index = () => {

    let [password,
        setPassword] = useState("");
    let [error,
        setError] = useState(false);
    const {id: userId, token} = useParams();
    const navigate = useNavigate();

    localStorage.removeItem("user");
    localStorage.removeItem("authToken");

    const handleResetPassword = async(e) => {
        e.preventDefault();

        if (password === "" || password.length < 8) 
            setError(true);
        setTimeout(() => {
            setError(false);
        }, 3000);

        const response = await postRequest(`/reset-password/${userId}/${token}`, {password});
        response && navigate("/");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-[#EEF5FE]">
            <form
                onSubmit={handleResetPassword}
                className="text-center flex flex-col gap-8 px-6 py-12 bg-white">
                <div className="flex flex-col gap-4">
                    <div
                        className="mx-auto w-[98px] h-[98px] bg-grayLight border-[2px] border-grayMedium rounded-full flex items-center justify-center">
                        <FiLock size={50}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-2xl font-semibold">Reset Password</h3>
                        <p className="text-grayHard text-lg font-normal">
                            Please enter your new password
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Input
                        handleChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Password"
                        icon={< FiLock color = "C1C5C5" size = {
                        27
                    } />}/> {error && (
                        <p className="text-start text-sm text-primary">
                            Password must be at least 8 characters
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-3">
                    <Button text={"Reset Password"}/>
                    <Link to="/" className="text-start text-primary font-medium">
                        Back to login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default index;
