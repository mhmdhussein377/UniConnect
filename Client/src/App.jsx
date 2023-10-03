import {Route, Routes} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import CommunityProfile from "./pages/CommunityProfile";
import Profile from "./pages/Profile";
import OtherUsersProfile from "./pages/OtherUsersProfile";
import React, {useContext} from "react";
import {AuthContext} from "./Context/AuthContext";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import SmNotifications from "./pages/SmNotifications";
import NotFound from "./pages/NotFound"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import {QueryClientProvider, QueryClient} from "react-query";
 
const queryClient = new QueryClient()

function App() {

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

    return (
        <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Routes>
                {publicRoutes.map((route, index) => (<Route key={index} path={route.path} element={route.element}/>))}
                <Route element={< ProtectedRoutes />}>
                    {protectedRoutes.map((route, index) => (<Route key={index} path={route.path} element={route.element}/>))}
                </Route>
            </Routes>
        </QueryClientProvider>
        </React.StrictMode>
    );
}

export default App;
