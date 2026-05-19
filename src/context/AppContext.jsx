/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const publicRoutes = ["/login", "/signup"];

    useEffect(() => {
        const token = localStorage.getItem("token");
        const expiry = localStorage.getItem("tokenExpiry");
        const storedUser = localStorage.getItem("user");

        const isPublicRoute = publicRoutes.includes(location.pathname);

        if (!token || !expiry || Date.now() > Number(expiry)) {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiry");
            localStorage.removeItem("user");
            setUser(null);

            // only redirect if NOT on public page
            if (!isPublicRoute) {
                navigate("/login");
            }
        } else if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate, location.pathname]);

    const clearUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    const contextValue = {
        user,
        setUser,
        clearUser
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}
