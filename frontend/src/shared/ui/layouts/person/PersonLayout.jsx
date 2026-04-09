import "./PersonLayout.css"

import PersonToolbar from "./toolbar/PersonToolbar.jsx"
import PersonHistory from "./information/PersonHistory.jsx"
import PersonActions from "./buttons/PersonActions.jsx"

function PersonLayout({ data, columns, sectionTitle, filterValue, onFilterChange, currentPage, totalPage, onPrevPage, onNextPage  }) {
    return (
        <div className="shared-person-layout">
            <PersonToolbar
                filterValue={filterValue}
                onFilterChange={onFilterChange}
            />
            <PersonHistory 
                data={data} 
                columns={columns} 
                sectionTitle={sectionTitle}
            />
            <PersonActions
                currentPage={currentPage}
                totalPage={totalPage}
                onPrevPage={onPrevPage}
                onNextPage={onNextPage}
            />
        </div>
    )
}

export default PersonLayout
