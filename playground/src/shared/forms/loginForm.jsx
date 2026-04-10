import './loginForm.css'

function LoginForm() {
    return (
        <form id="login-form">
            <h2>Login</h2>
            <input type="email" placeholder='*email...' required ></input>
            <input type="password" placeholder='*password...' required ></input>
            <button type='submit'>Login ⮕</button>
            <p>Don't remember your password?</p>
        </form>
    )
}

export default LoginForm