import {useContext} from "react"
import {AuthContext} from "./../Context/AuthContext"
import {Route, Navigate} from "react-router-dom"

const ProtectedRoute = ({element,...rest}) => {

    const {user} = useContext(AuthContext)

    return (
        <Route
            {...rest}
            element={user ? element : <Navigate to="/"/>}/>
    )
}

export default ProtectedRoute