import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import CommunityProfile from "./pages/CommunityProfile";
import Profile from "./pages/Profile";
import OtherUsersProfile from "./pages/OtherUsersProfile";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";

function App() {
  
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      <Route path="/home" element={user ? <Home /> : <Navigate to={"/"} />} />
      <Route
        path={`/profile/${user?.username}`}
        element={user ? <Profile /> : <Navigate to={"/"} />}
      />
      <Route
        path="/profile/:username"
        element={user ? <OtherUsersProfile /> : <Navigate to={"/"} />}
      />
      <Route
        path="/community/:id"
        element={user ? <CommunityProfile /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
}

export default App;
