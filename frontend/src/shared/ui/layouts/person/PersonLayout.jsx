import "./PersonLayout.css"
import PersonToolbar from "./toolbar/PersonToolbar.jsx"
import PersonHistory from "./information/PersonHistory.jsx"
import PersonActions from "./buttons/PersonActions.jsx"
import PersonTitle from "../../titles/person/PersonTitle.jsx"

function PersonLayout({ title, name, data, columns, sectionTitle, filterValue, onFilterChange, currentPage, totalPage, onPrevPage, onNextPage  }) {
    return (
        <div className="shared-person-layout">
            <PersonTitle 
                title={title} 
                name={name}
                sectionTitle={sectionTitle}
            />
            <PersonToolbar
                filterValue={filterValue}
                onFilterChange={onFilterChange}
            />
            <PersonHistory 
                data={data} 
                columns={columns} 
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
