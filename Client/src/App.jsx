import './App.css'
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Home from "./pages/Home"
import CommunityProfile from "./pages/CommunityProfile"
import Profile from "./pages/Profile"
import OtherUsersProfile from "./pages/OtherUsersProfile"
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {

  const {user} = useContext(AuthContext)

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path={`/profile/${user?.username}`} element={<Profile />} />
      <Route path="/profile/:username" element={<OtherUsersProfile />} />
      <Route path="/community/:id" element={<CommunityProfile />} />
    </Routes>
  );
}

export default App
