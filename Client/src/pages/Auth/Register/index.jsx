import Input from "../components/Input";
import Logo from "./../../../assets/UniConnectLogo.png"
import {MdAlternateEmail} from "react-icons/md";
import {AiOutlineUser, AiOutlineIdcard} from "react-icons/ai";
import {FiLock} from "react-icons/fi";
import {postRequest} from "../../../utils/requests";
import {useState} from "react";
import {Link} from "react-router-dom"
import Button from "../components/Button";

const index = () => {

    let [inputs,
        setInputs] = useState({});

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="text-center flex flex-col gap-8 px-4">
                <div className="flex flex-col gap-4">
                    <div
                        className="m-auto w-[98px] h-[98px] bg-grayLight border-[2px] border-grayMedium rounded-full flex items-center justify-center">
                        <img className="w-[50px]" src={Logo} alt="Logo"/>
                    </div>
                    <div></div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-2xl font-semibold">Get Started With Us!</h3>
                        <p className="text-grayHard text-lg font-normal">
                            Join our community by creating an account.
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
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        icon={< AiOutlineIdcard size = {
                        27
                    }
                    color = "C1C5C5" />}/>
                    <Input
                        handleChange={handleChange}
                        type="text"
                        name="username"
                        placeholder="Username"
                        icon={< AiOutlineUser size = {
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
                    <p className="text-start text-[#737373]">Already have an account? <Link to="/" className="text-primary font-medium">Login</Link></p>
                </div>
                <Button text="Sign Up" />
            </form>
        </div>
    );
}

export default index