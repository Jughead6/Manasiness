import './CardToolbar.css'

import SearchBarCard from './searchbar/CardSearchInput.jsx'

function CardToolbar({ action }) {
    return (
        <div className="shared-card-toolbar">
            <SearchBarCard action={action}/>
        </div>
    )
}

export default CardToolbar