import './AuthMascot.css'

function AuthMascot() {
    return (
        <div className="shared-auth-mascot" aria-hidden="true">
            <div className="shared-auth-mascot-ears">
                <span></span>
                <span></span>
            </div>
            <div className="shared-auth-mascot-face">
                <div className="shared-auth-mascot-eyes">
                    <span></span>
                    <span></span>
                </div>
                <div className="shared-auth-mascot-nose"></div>
                <div className="shared-auth-mascot-smile"></div>
            </div>
            <div className="shared-auth-mascot-hands">
                <span></span>
                <span></span>
            </div>
            <div className="shared-auth-mascot-shadow"></div>
        </div>
    )
}

export default AuthMascot
