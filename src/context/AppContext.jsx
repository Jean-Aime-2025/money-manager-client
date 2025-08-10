/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const expiry = localStorage.getItem("tokenExpiry");
        const storedUser = localStorage.getItem("user");

        if (!token || !expiry || Date.now() > Number(expiry)) {
            // Token missing or expired → clear and redirect
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiry");
            localStorage.removeItem("user");
            setUser(null);
            navigate("/login"); // redirect to home
        } else if (storedUser) {
            // Restore user from storage
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

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
};
