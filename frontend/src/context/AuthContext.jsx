import { createContext, useContext, useEffect, useState } from "react";
import { getToken,removeToken,setToken } from "../utils/token";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = getToken()
        if(token) {
            setUser({token})
        }
        setLoading(false)
    } , [])

    const login = (data) => {
        setToken(data.token)

        setUser(data.user)
    }

    const logout = () => {
        removeToken()

        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            loading
        }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}