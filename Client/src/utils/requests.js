import axios from "axios";

const baseURL = "http://localhost:8000";

const setAuthToken = (token) => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        localStorage.setItem("authToken", token)
    }else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("authToken")
    }
}

const getAuthToken = () => {
    return localStorage.getItem("authToken")
}

const makeRequest = async(method, url, data = null, authRequired = true, config = {}, errorHandler = null) => {
    try {
        if(authRequired) {
            const token = getAuthToken()
            if(token) {
                config.headers = {
                    'Authorization' : `Bearer ${token}`
                }
            }
        }

        const response = await axios({
            method,
            url: `${baseURL}${url}`,
            data,
            ...config
        })

        return response.data
    } catch (error) {
        if(errorHandler) {
            errorHandler(error)
        }
        console.log(error)
        return null
    }
}

const getRequest = async(url, authRequired = true, errorHandler = null) => {
    // config will give an error because we are not passing anything
    return makeRequest("GET", url, null, authRequired, errorHandler)
}

const postRequest = async(url, data = null, authRequired = true, errorHandler = null) => {
    return makeRequest("POST", url, data, authRequired, {}, errorHandler)
}

export {getRequest, postRequest, setAuthToken}