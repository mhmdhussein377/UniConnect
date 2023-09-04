import {useState} from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Logo from "./../../../assets/UniConnectLogo.png";
import {MdAlternateEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";
import {Link} from "react-router-dom";
import { postRequest } from "../../../utils/requests";

const index = () => {
    let [inputs,
        setInputs] = useState({});
    let [error,
        setError] = useState(false);

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleLogin = async(e) => {
        e.preventDefault()

        const response = await postRequest("/api/login", inputs, false)
        
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="text-center flex flex-col gap-8 px-4">
                <div className="flex flex-col gap-4">
                    <div
                        className="m-auto w-[98px] h-[98px] bg-grayLight border-[2px] border-grayMedium rounded-full flex items-center justify-center">
                        <img className="w-[50px]" src={Logo} alt="Logo"/>
                    </div>
                    <div></div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-2xl font-semibold">Welcome back!</h3>
                        <p className="text-grayHard text-lg font-normal">
                            Please enter your email and password below
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Input
                        handleChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Email"
                        icon={< MdAlternateEmail size = {
                        27
                    }
                    color = "C1C5C5" />}/>
                    <Input
                        handleChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                        minLength="8"
                        icon={< FiLock color = "C1C5C5" size = {
                        27
                    } />}/>
                    <p className="text-start text-[#737373]">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary font-medium">
                            Register
                        </Link>
                    </p>
                </div>
                <Button text="Login"/>
            </form>
        </div>
    );
};

export default index;
