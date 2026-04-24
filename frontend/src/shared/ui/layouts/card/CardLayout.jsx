import "./CardLayout.css"

import CardGrid from "./content/CardGrid.jsx"
import CardToolbar from "./toolbar/CardToolbar.jsx"
import PageTitle from "../../titles/page/PageTitle.jsx"
import LoadingOverlay from "../../modal/LoadingOverlay.jsx"

function CardLayout({ title, subtitle, data, action, route, onCreateClick, searchValue, onSearchChange, filterGroups = [], resultsCount = 0, emptyMessage, isLoading = false }) {
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
                filterGroups={filterGroups}
                resultsCount={resultsCount}
            />
            <CardGrid data={data} route={route} emptyMessage={emptyMessage} />
            {isLoading ? <LoadingOverlay /> : null}
        </div>
    )
}

export default CardLayout
