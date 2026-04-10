import './LoginPage.css'
import LoginModal from '../../shared/modals/loginModal'
import LoginPanel from '../../shared/components/loginPanel/loginPanel'

function LoginPage() {
    return (
        <LoginModal>
            <LoginPanel/>
        </LoginModal>
    )
}

export default LoginPage