import "./TableFilter.css"

function TableFilter({ value, onChange }) {
    return (
        <fieldset className="shared-table-filter">
            <legend>Filter By</legend>
            <ul className="shared-table-filter-options">
                <li>
                    <label className="shared-table-filter-option" htmlFor="shared-table-filter-recent">
                        <span>Most Recent</span>
                        <input
                            id="shared-table-filter-recent"
                            type="radio"
                            name="table-sort-order"
                            value="recent"
                            checked={value === 'recent'}
                            onChange={onChange}
                        />
                    </label>
                </li>
                <li>
                    <label className="shared-table-filter-option" htmlFor="shared-table-filter-oldest">
                        <span>Oldest</span>
                        <input
                            id="shared-table-filter-oldest"
                            type="radio"
                            name="table-sort-order"
                            value="oldest"
                            checked={value === 'oldest'}
                            onChange={onChange}
                        />
                    </label>
                </li>
            </ul>
        </fieldset>
    )
}

export default TableFilter