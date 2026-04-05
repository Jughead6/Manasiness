import './CardToolbar.css'

import CardSearchInput from './searchbar/CardSearchInput.jsx'
import CardButtonCreate from './buttons/CardButtonCreate.jsx'

function CardToolbar({ action, onCreateClick }) {
    return (
        <div className="shared-card-toolbar">
            <CardSearchInput action={action} />
            {onCreateClick && <CardButtonCreate onClick={onCreateClick} />}
        </div>
    )
}

export default CardToolbar