import "./TableToolbar.css"
import TableButtonRegister from "./filter/buttons/TableButtonRegister.jsx"
import TableFilter from "./filter/TableFilter.jsx"

function TableToolbar({ onCreateClick, filterValue, onFilterChange }) {
    return (
        <div className="shared-table-toolbar">
            <TableFilter value={filterValue} onChange={onFilterChange} />
            {onCreateClick && <TableButtonRegister onCreateClick={onCreateClick} />}
        </div>
    )
}

export default TableToolbar
