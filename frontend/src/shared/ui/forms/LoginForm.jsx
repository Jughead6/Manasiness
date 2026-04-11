import './LoginForm.css'
import { useNavigate } from "react-router-dom"

function LoginForm({onSubmit}) {
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        onSubmit(data)
    }

    return (
        <form id="shared-login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input name="email" type="email" placeholder='*email...' required ></input>
            <input name="password" type="password" placeholder='*password...' required ></input>
            <button type='submit'>Login ⮕</button>
            <p>No have account? <span onClick={() => navigate("/register")}>Create here</span></p>
        </form>
    )
}

export default LoginForm