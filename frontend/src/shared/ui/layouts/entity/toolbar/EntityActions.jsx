import "./EntityActions.css"
import { useNavigate } from "react-router-dom"

function EntityActions({ onDeactivateClick }) {
    const navigate = useNavigate()

    return (
        <div className="shared-entity-actions">
            <button onClick={() => navigate(`edit`)}>Edit</button>
            <button onClick={onDeactivateClick}>Deactivate</button>
        </div>
    )
}

export default EntityActions
