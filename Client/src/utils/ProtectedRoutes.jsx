import {useContext} from "react"
import {AuthContext} from "../Context/AuthContext"
import {Navigate, Outlet} from "react-router-dom"

const ProtectedRoutes = () => {

    const {user} = useContext(AuthContext)

    return (
        user ? <Outlet /> : <Navigate to="/"/>
    )
}

export default ProtectedRoutes