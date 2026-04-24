import "./CardToolbar.css"

import CardButtonCreate from "./buttons/CardButtonCreate.jsx"
import CardSearchInput from "./search/CardSearchInput.jsx"
import CardToolbarFilters from "./filters/CardToolbarFilters.jsx"

function CardToolbar({ action, onCreateClick, searchValue, onSearchChange, filterGroups, resultsCount }) {
    return (
        <div className="shared-card-toolbar">
            <div className="shared-card-toolbar-main">
                <CardSearchInput action={action} value={searchValue} onChange={onSearchChange} />
                <CardToolbarFilters filterGroups={filterGroups} />
            </div>
            <div className="shared-card-toolbar-actions">
                <p className="shared-card-toolbar-results">Results: {resultsCount}</p>
                {onCreateClick && <CardButtonCreate onClick={onCreateClick} />}
            </div>
        </div>
    )
}

export default CardToolbar
