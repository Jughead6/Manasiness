import './AuthOverlay.css'

function AuthOverlay({ children }) {
    return (
        <div id="shared-auth-overlay">
            {children}
        </div>
    )
}

export default AuthOverlay