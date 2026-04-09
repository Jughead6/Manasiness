import "./PersonToolbar.css"

import PersonHistoryFilter from "./filter/PersonHistoryFilter.jsx"

function PersonToolbar({filterValue, onFilterChange}) {
    return (
        <div className="shared-person-toolbar">
            <PersonHistoryFilter 
                value={filterValue}
                onChange={onFilterChange}
            />
        </div>
    )
}

export default PersonToolbar
