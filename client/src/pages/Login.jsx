import { useState } from "react";
import { Link, useNavigate} from 'react-router-dom'
import { useAuth } from "../context/AuthContext";

const Login = ()=> {
    const {login, loading, error} = useAuth()
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e)=> {
        setForm({...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e)=> {
        e.preventDefault()
        try{
            await login(form.email, form.password)
            navigate('/profile')
        }catch{
            // eror already in context
        }
    }

    return (
        <div>
            <h2>Sign in</h2>
            {error && (
                <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label><br />
                    <input name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                             style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                    />
                </div>
                <div style={{ marginBottom: '24px' }}>
          <label>Password</label><br />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
            </form>
            <p style={{ marginTop: '16px' }}> No account? <Link to="/register">Create one</Link></p>
        </div>
    );
};

export default Login;

