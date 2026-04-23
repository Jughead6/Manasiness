import "./TableToolbar.css"
import TableButtonRegister from "./filter/buttons/TableButtonRegister.jsx"
import TableFilter from "./filter/TableFilter.jsx"
import TableWindow from "./window/TableWindow.jsx"

function TableToolbar({ onCreateClick, filterValue, onFilterChange, windowLabel, hasOlder, hasNewer, onOlder, onNewer }) {
    return (
        <div className="shared-table-toolbar">
            <TableFilter value={filterValue} onChange={onFilterChange} />
            <TableWindow label={windowLabel} hasOlder={hasOlder} hasNewer={hasNewer} onOlder={onOlder} onNewer={onNewer} />
            {onCreateClick ? <TableButtonRegister onCreateClick={onCreateClick} /> : null}
        </div>
    )
}

export default TableToolbar
