import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import CommunityProfile from "./pages/CommunityProfile";
import Profile from "./pages/Profile";
import OtherUsersProfile from "./pages/OtherUsersProfile";
import {useContext} from "react";
import {AuthContext} from "./Context/AuthContext";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import SmNotifications from "./pages/SmNotifications";
import NotFound from "./pages/NotFound"
import {QueryClientProvider, QueryClient} from "react-query";

const queryClient = new QueryClient()

function App() {

    const {user} = useContext(AuthContext);

    const routes = [
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
            path: "/home",
            element: user
                ? <Home/>
                : <Navigate to={"/"}/>
        }, {
            path: `/profile/${user
                ?.username}`,
            element: user
                ? <Profile/>
                : <Navigate to={"/"}/>
        }, {
            path: "/profile/:username",
            element: user
                ? <OtherUsersProfile/>
                : <Navigate to={"/"}/>
        }, {
            path: "/community/:id",
            element: user
                ? <CommunityProfile/>
                : <Navigate to={"/"}/>
        }, {
            path: "/notifications",
            element: <SmNotifications/>
        }, {
            path: "*",
            element: <NotFound />
        }
    ];

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </QueryClientProvider>
    );
}

export default App;
