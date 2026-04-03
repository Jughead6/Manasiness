import './tablefilter.css'

function TableFilter() {
    return (
        <div className="table-filter">
            <h2>Filter By</h2>
            <ul>
                <li>
                    <label htmlFor="filter-morerecently">More recently</label>
                    <input type="radio" name="filter" className="filter-morerecently"></input>
                </li>
                <li>
                    <label htmlFor="filter-oldest">Oldest</label>
                    <input type="radio" name="filter" className="filter-oldest"></input>
                </li>
            </ul>                               
        </div>
    )
}

export default TableFilter