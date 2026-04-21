import "./CardLayout.css"

import CardGrid from "./content/CardGrid.jsx"
import CardToolbar from "./toolbar/CardToolbar.jsx"
import PageTitle from "../../titles/page/PageTitle.jsx"

function CardLayout({ title, subtitle, data, action, route, onCreateClick, searchValue, onSearchChange }) {
    return (
        <div className="shared-card-layout">
            <PageTitle  
                title={title}
                subtitle={subtitle}
            />
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
