import "./TableToolbar.css"

import TableActions from "./button/TableActions.jsx"
import TableFilter from "./filter/TableFilter.jsx"

function TableToolbar({ onCreateClick }) {
    return (
        <div className="shared-table-toolbar">
            <TableFilter />
            <TableActions onClick={onCreateClick} />
        </div>
    )
}

export default TableToolbar
