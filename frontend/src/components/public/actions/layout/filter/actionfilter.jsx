import './actionfilter.css'

function ActionFilter() {
    return (
        <div id="action-filterbar">
            <h3 id="action-filtertitle">Filter By</h3>
            <ul>
                <li className="action-filters">
                    <label htmlFor="filter-az">A-Z</label>
                    <input type="radio" name="filter" id="filter-az"></input>
                </li>
                <li className="action-filters">
                    <label htmlFor="filter-za">Z-A</label>
                    <input type="radio" name="filter" id="filter-za"></input>
                </li>
                <li className="action-filters">
                    <label htmlFor="filter-morerecently">More recently</label>
                    <input type="radio" name="filter" id="filter-morerecently"></input>
                </li>
                <li className="action-filters">
                    <label htmlFor="filter-oldest">Oldest</label>
                    <input type="radio" name="filter" id="filter-oldest"></input>
                </li>
                <li className="action-filters">
                    <label htmlFor="filter-clearfilter">Clear Filter</label>
                    <input type="radio" name="filter" id="filter-clearfilter"></input>
                </li>
            </ul>
        </div>
    )
}

export default ActionFilter