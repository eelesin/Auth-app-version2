import { Navigate } from 'react-router-dom'
import { useAuth} from '../context/AuthContext'

const PrivateRoute = ( {children }) => {
    const {accessToken } = useAuth();

    if(!accessToken) {
        return <Navigate to='/login' replace/>
    }

    return children;
}

export default PrivateRoute;