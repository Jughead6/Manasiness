import './filterbar.css'

function FilterBar() {
    return (
        <div id="category-filterbar">
            <h3 id="category-filtertitle">Filtrar por</h3>
            <ul>
                <li className="category-fillters">
                    <label htmlFor="filter-az">A-Z</label>
                    <input type="radio" name="filter" id="filter-az"></input>
                </li>
                <li className="category-fillters">
                    <label htmlFor="filter-za">Z-A</label>
                    <input type="radio" name="filter" id="filter-za"></input>
                </li>
                <li className="category-fillters">
                    <label htmlFor="filter-morerecently">More recently</label>
                    <input type="radio" name="filter" id="filter-morerecently"></input>
                </li>
                <li className="category-fillters">
                    <label htmlFor="filter-oldest">Oldest</label>
                    <input type="radio" name="filter" id="filter-oldest"></input>
                </li>
                <li className="category-fillters">
                    <label htmlFor="filter-clearfilter">Clear Filter</label>
                    <input type="radio" name="filter" id="filter-clearfilter"></input>
                </li>
            </ul>
        </div>
    )
}

export default FilterBar