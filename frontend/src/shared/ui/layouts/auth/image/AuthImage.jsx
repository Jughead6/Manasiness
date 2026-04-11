import './AuthImage.css'

import image from '../../../../../assets/images/image-login.png'

function AuthImage() {
    return (
        <div id="shared-auth-image">
            <img src={image} alt="image login" />
        </div>
    )
}

export default AuthImage
