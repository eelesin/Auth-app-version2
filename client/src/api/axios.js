import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true, // sends the httpOnly cookie automatically
})

// -- Request interceptor --
//Attaches the access token to every request automatically
//Components never think about headers

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if(token) {
            config.headers.Authorisation = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
    
)

export default api;