import { useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = ()=> {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/login')
    };

    return (
        <div style={{ maxWidth: '480px', margin: '80px auto', padding: '0 24px' }}>
            <h2>Profile</h2>
            {user && (
                <div style={{ marginBottom: '32px' }}>
                    <p><strong>Name:</strong>{user.name}</p>
                    <p><strong>Email:</strong>{user.email}</p>
                    <p><strong>Role:</strong>{user.role}</p>
                </div>
            )}
            <button onClick={handleLogout}></button>
        </div>
    )
}

export default Profile;