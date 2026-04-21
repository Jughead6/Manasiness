import "./CardButtonCreate.css"
import { Plus } from "lucide-react"

function CardButtonCreate({ onClick }) {
    return (
        <div className="shared-card-button">
            <button type="button" onClick={onClick}><Plus/>Create</button>
        </div>
    )
}

export default CardButtonCreate
