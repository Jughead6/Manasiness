import "./TableFilter.css"

function TableFilter({ value, onChange }) {
    return (
        <fieldset className="shared-table-filter">
            <legend>Filter By</legend>
            <div className="shared-table-filter-switch">
                <input
                    id="shared-table-filter-recent"
                    name="table-sort-order"
                    type="radio"
                    value="recent"
                    checked={value === "recent"}
                    onChange={onChange}
                />
                <label className="shared-table-filter-option" htmlFor="shared-table-filter-recent">Most Recent</label>

                <input
                    id="shared-table-filter-oldest"
                    name="table-sort-order"
                    type="radio"
                    value="oldest"
                    checked={value === "oldest"}
                    onChange={onChange}
                />
                <label className="shared-table-filter-option" htmlFor="shared-table-filter-oldest">Oldest</label>

                <span className="shared-table-filter-background"></span>
            </div>
        </fieldset>
    )
}

export default TableFilter