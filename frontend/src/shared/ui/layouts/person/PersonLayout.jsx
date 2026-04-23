import "./PersonLayout.css"
import PersonToolbar from "./toolbar/PersonToolbar.jsx"
import PersonHistory from "./information/PersonHistory.jsx"
import PersonActions from "./buttons/PersonActions.jsx"
import PersonTitle from "../../titles/person/PersonTitle.jsx"
import LoadingOverlay from "../../modal/LoadingOverlay.jsx"

function PersonLayout({
    title,
    name,
    data,
    columns,
    sectionTitle,
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
        <div className="shared-person-layout">
            <PersonTitle title={title} name={name} sectionTitle={sectionTitle} />
            <PersonToolbar
                filterValue={filterValue}
                onFilterChange={onFilterChange}
                windowLabel={windowLabel}
                hasOlder={hasOlder}
                hasNewer={hasNewer}
                onOlder={onOlder}
                onNewer={onNewer}
            />
            <PersonHistory data={data} columns={columns} emptyMessage={emptyMessage} />
            <PersonActions
                currentPage={currentPage}
                totalPage={totalPage}
                onPrevPage={onPrevPage}
                onNextPage={onNextPage}
            />
            {isLoading ? <LoadingOverlay /> : null}
        </div>
    )
}

export default PersonLayout
