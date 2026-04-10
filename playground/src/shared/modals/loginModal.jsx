import './loginModal.css'

function LoginModal({ children }) {
    return (
        <div id="login-modal">
            {children}
        </div>
    )
}

export default LoginModal