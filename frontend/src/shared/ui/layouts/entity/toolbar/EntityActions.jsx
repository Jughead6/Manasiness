import './EntityActions.css'
import { useNavigate } from 'react-router-dom'

function EntityActions({ onDesactivateClick }) {
    const navigate = useNavigate()

    return (
        <div className="shared-entity-actions">
            <button onClick={() => navigate(`edit`)}>Edit</button>
            <button onClick={onDesactivateClick}>Desactivate</button>
        </div>
    )
}

export default EntityActions