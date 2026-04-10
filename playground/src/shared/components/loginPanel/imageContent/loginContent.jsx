import './loginContent.css'
import LoginForm from '../../../forms/loginForm'
import RegisterForm from '../../../forms/registerForm'

function LoginContent() {
    return (
        <div id="login-content">
            <LoginForm/>
            <RegisterForm/>
        </div>
    )
}

export default LoginContent