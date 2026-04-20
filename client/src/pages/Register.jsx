import { useState } from "react";
import { Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = ()=> {
    const { register, loading, error} = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({name: '', email: '', password: ''})


const handleChange = (e)=> {
    setForm({...form, [e.target.name]: e.target.value})
}

const handleSubmit = async (e)=> {
        e.preventDefault();
        try{
            await register(form.name, form.email, form.password)
            navigate('/login')
        }catch{
            //error already set in context
        }
    }
        return (
            <div style={{ maxWidth: '480px', margin: '80px auto', padding: '0 24px' }}>
                <h2>Create Account</h2>
                {error && (
                    <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Name</label><br />
                        <input name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Email</label>
                        <input 
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                        />

                    </div>
                    <div style={{ marginBottom: '24px'}}>
                        <label>Password</label>
                        <input name="password" 
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                         {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>
                <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </div>
        )
}

export default Register;
