// components/logout.jsx
import { createContext, useContext } from 'react';


const LogoutContext = createContext();

export const useLogout = () => {
    const context = useContext(LogoutContext);
    if (!context) {
        throw new Error('useLogout must be used within a LogoutProvider');
    }
    return context;
};

export const LogoutProvider = ({ children,  onLogout }) => {
    return (
        

         <LogoutContext.Provider value={onLogout}>
            {children}
        </LogoutContext.Provider>
);
};



