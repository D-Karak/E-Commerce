import { createContext,useState,useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(()=> {
        try{
           const existingUser= localStorage.getItem('user')
            return existingUser ? JSON.parse(existingUser) : null
        }
        catch(err){
            console.log(err)
            return null
        }
});
    const login= (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
    );
}