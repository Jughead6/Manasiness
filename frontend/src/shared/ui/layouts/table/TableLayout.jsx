import "./TableLayout.css"

import TableToolbar from "./toolbar/TableToolbar.jsx"
import DataTable from "./content/DataTable.jsx"
import TableActions from "./buttons/TableActions.jsx"
import PageTitle from "../../titles/page/PageTitle.jsx"
import LoadingOverlay from "../../modal/LoadingOverlay.jsx"

function TableLayout({
    title,
    subtitle,
    data,
    columns,
    onCreateClick,
    filterValue,
    onFilterChange,
    windowLabel,
    hasOlder,
    hasNewer,
    onOlder,
    onNewer,
    currentPage,
    totalPage,
    onPrevPage,
    onNextPage,
    isLoading,
    emptyMessage
}) {
    return (
        <div className="shared-table-layout">
            <PageTitle title={title} subtitle={subtitle} />
            <TableToolbar
                onCreateClick={onCreateClick}
                filterValue={filterValue}
                onFilterChange={onFilterChange}
                windowLabel={windowLabel}
                hasOlder={hasOlder}
                hasNewer={hasNewer}
                onOlder={onOlder}
                onNewer={onNewer}
            />
            <DataTable data={data} columns={columns} emptyMessage={emptyMessage} />
            <TableActions currentPage={currentPage} totalPage={totalPage} onPrevPage={onPrevPage} onNextPage={onNextPage} />
            {isLoading ? <LoadingOverlay /> : null}
        </div>
    )
}

export default TableLayout
