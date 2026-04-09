import "./TableLayout.css"

import TableToolbar from "./toolbar/TableToolbar.jsx"
import DataTable from "./content/DataTable.jsx"

function TableLayout({ data, columns, onCreateClick, filterValue, onFilterChange }) {
    return (
        <div className="shared-table-layout">
            <TableToolbar
                onCreateClick={onCreateClick}
                filterValue={filterValue}
                onFilterChange={onFilterChange}
            />
            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default TableLayout