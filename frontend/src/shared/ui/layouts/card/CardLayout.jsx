import "./CardLayout.css"

import CardGrid from "./content/CardGrid.jsx"
import CardToolbar from "./toolbar/CardToolbar.jsx"

function CardLayout({ data, action, route, onCreateClick }) {
    return (
        <div className="shared-card-layout">
            <CardToolbar action={action} onCreateClick={onCreateClick} />
            <CardGrid data={data} route={route} />
        </div>
    )
}

export default CardLayout
