import {useContext} from "react";
import {AuthContext} from "../Context/AuthContext";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import OtherUsersProfile from "../pages/OtherUsersProfile";
import CommunityProfile from "../pages/CommunityProfile";
import SmNotifications from "../pages/SmNotifications";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import NotFound from "../pages/NotFound";

const MyRoutes = () => {
    const {user} = useContext(AuthContext);

    const protectedRoutes = [
        {
            path: "/home",
            element: <Home/>
        }, {
            path: `/profile/${user
                ?.username}`,
            element: <Profile/>
        }, {
            path: "/profile/:username",
            element: <OtherUsersProfile/>
        }, {
            path: "/community/:id",
            element: <CommunityProfile/>
        }, {
            path: "/notifications",
            element: <SmNotifications/>
        }
    ];

    const publicRoutes = [
        {
            path: "/",
            element: <Login/>
        }, {
            path: "/register",
            element: <Register/>
        }, {
            path: "/forgot-password",
            element: <ForgotPassword/>
        }, {
            path: "/reset-password/:id/:token",
            element: <ResetPassword/>
        }, {
            path: "*",
            element: <NotFound/>
        }
    ];

    return {publicRoutes, protectedRoutes};
};

export default MyRoutes;
