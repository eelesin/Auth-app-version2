
import { createContext, useContext, useState } from 'react'
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null)
    const [loading, setLoading] = useState(false)
     const [error, setError] = useState(null);
    

    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);

        try{
            const { data } = await api.post('/auth/register',{
                name,
                email,
                password,
            });
            return data;
        }catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            setError(message)
            throw err;
        }finally {
            setLoading(false);
        }
    }

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try{
            const { data } = await api.post('/auth/login', { email, password })

          //store access token in state - never store in storage
      // We use localStorage here temporarily until Phase 5 adds silent refresh
      setAccessToken(data.accessToken);
      setUser(data.user)
      localStorage.setItem('accessToken', data.accessToken);

      return data;
        }catch(err){
            const message = err.response?.data?.message || 'Login failed';
            setError(message);
            throw err;
        } finally {
            setLoading(false)
        }
    };

    const logout = ()=> {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem('accessToken')
        //Phase 5 will also call the /auth/logout o clear the cookie server side
    };

    return(
        <AuthContext.Provider 
        value={{ user, accessToken, loading, error, login, logout, register}}>
            {children}
            
    </AuthContext.Provider>
    )
};

//Custom hook - components call useAuth() instead of useContext(AuthContext)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used inside AuthProvider')
    }
    return context;
}