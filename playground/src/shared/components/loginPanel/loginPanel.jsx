import './loginPanel.css'
import LoginContent from './imageContent/loginContent.jsx'
import LoginImage from './imagePanel/loginImage.jsx'

function LoginPanel() {
    return (
        <div id="login-panel">
            <LoginImage/>
            <LoginContent/>
        </div>
    )
}

export default LoginPanel