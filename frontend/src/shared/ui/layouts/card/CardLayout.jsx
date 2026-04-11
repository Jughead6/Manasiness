import "./CardLayout.css"

import CardGrid from "./content/CardGrid.jsx"
import CardToolbar from "./toolbar/CardToolbar.jsx"

function CardLayout({ data, action, route, onCreateClick, searchValue, onSearchChange }) {
    return (
        <div className="shared-card-layout">
            <CardToolbar
                action={action}
                onCreateClick={onCreateClick}
                searchValue={searchValue}
                onSearchChange={onSearchChange}
            />
            <CardGrid data={data} route={route} />
        </div>
    )
}

export default CardLayout
