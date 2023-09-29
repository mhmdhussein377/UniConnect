import {useContext, useRef, useState} from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Logo from "./../../../assets/UniConnectLogo.png";
import {MdAlternateEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom";
import {postRequest, setAuthToken} from "../../../utils/requests";
import {AuthContext} from "./../../../Context/AuthContext"
import {GoogleOAuthProvider, GoogleLogin} from "@react-oauth/google";
import jwt_decode from "jwt-decode"
import axios from "axios";
import {handleChange} from "./../../../utils/handleChange.js"

const index = () => {

    const {dispatch} = useContext(AuthContext)

    localStorage.removeItem("user")
    localStorage.removeItem("authToken")

    let [inputs,
        setInputs] = useState({});
    let [error,
        setError] = useState({});
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        handleChange(e, setInputs)
    };

    const resetError = () => {
        setTimeout(() => {
            setError({isError: false, type: "", message: ""});
        }, 3000);
    };

    const handleLoginError = (error) => {
        if (error.response.data.error.status === 401) {
            setError({isError: true, type: "Wrong credentials", message: "Wrong credentials"})
            resetError()
            return
        }
    }

    const handleLogin = async(e) => {
        e.preventDefault()

        const {email, password} = inputs

        if (!email || !password) {
            setError({isError: true, type: "missing fields", message: "All fields are required"});
            resetError()
            return
        }

        try {
            dispatch({type: "LOGIN_START"})

            const response = await postRequest("/login", inputs, handleLoginError);
            response && setAuthToken(response.token)
            
            dispatch({type: "LOGIN_SUCCESS", payload: response})
            response && navigate("/home");
        } catch (error) {
            dispatch({type: "LOGIN_FAILURE"})
        }
    }

    const handleGoogleLoginSuccess = (credentialResponse) => {
        const decoded = jwt_decode(credentialResponse.credential);

        axios
            .post("http://localhost:3000/api/register/google", decoded)
            .then((response) => {
                console.log("User registration successful:", response.data);
                response && setAuthToken(response.data.token);

                dispatch({type: "LOGIN_SUCCESS", payload: response.data.user});

                navigate("/home");
            })
            .catch((error) => {
                console.error("User registration error:", error);
            });
    };

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
                        handleChange={handleInputChange}
                        type="email"
                        name="email"
                        placeholder="Email"
                        icon={< MdAlternateEmail size = {
                        27
                    }
                    color = "C1C5C5" />}/>
                    <Input
                        handleChange={handleInputChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                        minLength="8"
                        icon={< FiLock color = "C1C5C5" size = {
                        27
                    } />}/> {error.isError && (error.type === "Wrong credentials"
                        ? (
                            <p className="text-start text-danger font-medium">
                                Wrong credentials
                            </p>
                        )
                        : (
                            <p className="text-start text-danger font-medium">
                                All fields are required
                            </p>
                        ))}
                    <p className="text-start text-[#737373]">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary font-medium">
                            Register
                        </Link>
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <Button text={"Login"}/>
                    <div className="flex w-full justify-center items-center">
                        <GoogleOAuthProvider
                            clientId="646754230791-n2oto0g1ubdqmlppu7fjib64rdu45qhr.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={() => {
                                console.log("Login Failed");
                            }}/>
                        </GoogleOAuthProvider>
                    </div>
                    <Link to="/forgot-password" className="text-start text-primary">
                        Forgot password?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default index;
