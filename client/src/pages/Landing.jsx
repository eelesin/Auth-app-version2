import { Link } from 'react-router-dom'

const Landing = ()=> {
    return (
        <div style={{ maxWidth: '480px', margin: '80px auto', padding: '0 24px' }}>
            <h1>Welcome</h1>
            <p>A secure full-stack application with JWT authentication.</p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <Link to="/register">
                <button>Create Account</button>
                </Link>
                <Link to="/login">
                <button>Sign in</button>
                </Link>
            </div>
        </div>
    )
}


export default Landing;
