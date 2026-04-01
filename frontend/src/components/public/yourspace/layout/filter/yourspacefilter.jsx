import './yourspacefilter.css'

function YourSpaceFilter() {
    return (
        <div id="yourspace-filter">
            <h2>Filter By</h2>
            <ul>
                <li>
                    <label htmlFor="filter-morerecently">More recently</label>
                    <input type="radio" name="filter" id="filter-morerecently"></input>
                </li>
                <li>
                    <label htmlFor="filter-oldest">Oldest</label>
                    <input type="radio" name="filter" id="filter-oldest"></input>
                </li>
            </ul>                               
        </div>
    )
}

export default YourSpaceFilter