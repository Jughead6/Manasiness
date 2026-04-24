import "./PersonToolbar.css"
import PersonHistoryFilter from "./filter/PersonHistoryFilter.jsx"
import PersonHistoryWindow from "./window/PersonHistoryWindow.jsx"

function PersonToolbar({ filterValue, onFilterChange, windowLabel, hasOlder, hasNewer, onOlder, onNewer }) {
    return (
        <div className="shared-person-toolbar">
            <PersonHistoryFilter value={filterValue} onChange={onFilterChange} />
            <PersonHistoryWindow label={windowLabel} hasOlder={hasOlder} hasNewer={hasNewer} onOlder={onOlder} onNewer={onNewer} />
        </div>
    )
}

export default PersonToolbar
