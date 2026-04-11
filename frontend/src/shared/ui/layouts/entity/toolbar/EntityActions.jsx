import "./EntityActions.css"
import { useNavigate } from "react-router-dom"

function EntityActions({ isActive, onDeactivateClick, onActivateClick }) {
    const navigate = useNavigate()

    return (
        <div className="shared-entity-actions">
            <button type="button" onClick={() => navigate('edit')}>Edit</button>
            <button type="button" onClick={isActive ? onDeactivateClick : onActivateClick}>
                {isActive ? 'Deactivate' : 'Activate'}
            </button>
        </div>
    )
}

export default EntityActions
