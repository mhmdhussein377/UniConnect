import {useNavigate} from "react-router-dom"

const index = () => {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-red-500">404</h1>
            <p className="text-lg text-gray-600">Page not found</p>
            <button
                className="mt-4 bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
                onClick={() => navigate("/home")}>
                Back home
            </button>
        </div>
    );
}

export default index