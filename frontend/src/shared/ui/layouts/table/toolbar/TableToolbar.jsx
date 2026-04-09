import "./TableToolbar.css"

import TableActions from "./button/TableActions.jsx"
import TableFilter from "./filter/TableFilter.jsx"

function TableToolbar({ onCreateClick, filterValue, onFilterChange }) {
    return (
        <div className="shared-table-toolbar">
            <TableFilter value={filterValue} onChange={onFilterChange} />
            <TableActions onClick={onCreateClick} />
        </div>
    )
}

export default TableToolbar