import './TableFilter.css'

function TableFilter() {
    return (
        <div className="shared-table-filter">
            <h2>Filter By</h2>
            <ul>
                <li>
                    <label className="shared-table-filter-option">
                        <span>More recently</span>
                        <input type="radio" name="filter" className="shared-table-filter-morerecently"></input>
                    </label>
                </li>
                <li>
                    <label className="shared-table-filter-option">
                        <span>Oldest</span>
                        <input type="radio" name="filter" className="shared-table-filter-oldest"></input>
                    </label>
                </li>
            </ul>                               
        </div>
    )
}

export default TableFilter
