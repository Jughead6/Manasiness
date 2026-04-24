import { Link } from 'react-router-dom'
import './LoginForm.css'

function LoginForm({ onSubmit }) {
    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        onSubmit(data)
    }

    return (
        <form id="shared-login-form" onSubmit={handleSubmit}>
            <div className="shared-login-form-header">
                <h1>Welcome Back</h1>
                <span>Enter your store account to continue.</span>
            </div>
            <div className="shared-login-form-fields">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="store@email.com" autoComplete="email" required />
            </div>
            <div className="shared-login-form-fields">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" placeholder="Your password" autoComplete="current-password" required />
            </div>
            <Link className="shared-login-form-forgot-link" to="/forgot-password">Forgot password?</Link>
            <button className="shared-login-form-button" type="submit">Log in</button>
            <div className="shared-login-form-footer">
                <span>New store?</span>
                <Link to="/register">Create account</Link>
            </div>
        </form>
    )
}

export default LoginForm
