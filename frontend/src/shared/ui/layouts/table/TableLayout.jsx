import "./TableLayout.css"

import TableToolbar from "./toolbar/TableToolbar.jsx"
import DataTable from "./content/DataTable.jsx"

function TableLayout({ data, columns, onCreateClick }) {
    return (
        <div className="shared-table-layout">
            <TableToolbar onCreateClick={onCreateClick}/>
            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default TableLayout
