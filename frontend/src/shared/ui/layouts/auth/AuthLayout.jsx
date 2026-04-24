import './AuthLayout.css'
import AuthContent from './content/AuthContent.jsx'
import AuthMascot from './mascot/AuthMascot.jsx'

function AuthLayout({ children }) {
    return (
        <div id="shared-auth-layout">
            <section className="shared-auth-visual">
                <div className="shared-auth-visual-header">
                    <h2>Welcome to Manasiness.</h2>
                    <span>Products, sales and staff in one simple workspace.</span>
                </div>
                <AuthMascot />
                <div className="shared-auth-visual-footer">
                    <p>Small business control panel</p>
                </div>
            </section>
            <AuthContent>{children}</AuthContent>
        </div>
    )
}

export default AuthLayout
