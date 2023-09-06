import './App.css'
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Home from "./pages/Home"
import CommunityProfile from "./pages/CommunityProfile"
import Profile from "./pages/Profile"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path='/profile' element={<Profile/>} />
      <Route path="/community/:id" element={<CommunityProfile />} />
    </Routes>
  );
}

export default App
