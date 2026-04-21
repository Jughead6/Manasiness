import "./TableLayout.css"

import TableToolbar from "./toolbar/TableToolbar.jsx"
import DataTable from "./content/DataTable.jsx"
import TableActions from "./buttons/TableActions.jsx"
import PageTitle from "../../titles/page/PageTitle.jsx"

function TableLayout({ title, subtitle, data, columns, onCreateClick, filterValue, onFilterChange, currentPage, totalPage, onPrevPage, onNextPage}) {
    return (
        <div className="shared-table-layout">
            <PageTitle
                title={title}
                subtitle={subtitle}
            />
            <TableToolbar
                onCreateClick={onCreateClick}
                filterValue={filterValue}
                onFilterChange={onFilterChange}
            />
            <DataTable data={data} columns={columns} />
            <TableActions
                currentPage={currentPage}
                totalPage={totalPage}
                onPrevPage={onPrevPage}
                onNextPage={onNextPage}
            />
        </div>
    )
}

export default TableLayout