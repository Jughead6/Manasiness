import './AuthLayout.css'
import AuthImage from './image/AuthImage.jsx'
import AuthContent from './content/AuthContent.jsx'

function AuthLayout({ children }) {
    return (
        <div id="shared-auth-layout">
            <AuthImage />
            <AuthContent>{children}</AuthContent>
        </div>
    )
}

export default AuthLayout