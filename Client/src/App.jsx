import {Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes"
import {QueryClientProvider, QueryClient} from "react-query";
import MyRoutes from "./utils/MyRoutes"
import React from "react";

const queryClient = new QueryClient()

function App() {

    const { publicRoutes, protectedRoutes } = MyRoutes()

    return (
        <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Routes>
                {publicRoutes?.map((route, index) => (<Route key={index} path={route.path} element={route.element}/>))}
                <Route element={< ProtectedRoutes />}>
                    {protectedRoutes?.map((route, index) => (<Route key={index} path={route.path} element={route.element}/>))}
                </Route>
            </Routes>
        </QueryClientProvider>
        </React.StrictMode>
    );
}

export default App;
