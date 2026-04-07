import "./CardToolbar.css"

import CardButtonCreate from "./buttons/CardButtonCreate.jsx"
import CardSearchInput from "./search/CardSearchInput.jsx"

function CardToolbar({ action, onCreateClick }) {
    return (
        <div className="shared-card-toolbar">
            <CardSearchInput action={action} />
            {onCreateClick && <CardButtonCreate onClick={onCreateClick} />}
        </div>
    )
}

export default CardToolbar
