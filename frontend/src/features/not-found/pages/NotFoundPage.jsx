import "./NotFoundPage.css"
import image404 from "../../../assets/images/404-error.png"
import { useNavigate } from "react-router-dom"

function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <div className="manasiness-notfound-page">
            <h1>Ooops!</h1>
            <img src={image404}></img>
            <h2>Page not Found</h2>
            <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
    )
}

export default NotFoundPage