import './AuthContent.css'

function AuthContent({ children }) {
    return (
        <div id="shared-auth-content">
            {children}
        </div>
    )
}

export default AuthContent