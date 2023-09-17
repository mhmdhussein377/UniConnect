import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContextProvider} from "./Context/AuthContext.jsx"
import './index.css'
import {QueryClient, QueryClientProvider} from "react-query"

const queryClient = new QueryClient();

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <Router>
                    <App/>
                </Router>
            </AuthContextProvider>
        </QueryClientProvider>
    </React.StrictMode>,)
