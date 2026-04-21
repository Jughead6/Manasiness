import "./PersonHistoryFilter.css"

function PersonHistoryFilter({ value, onChange }) {
    return (
        <div className="shared-person-history-filter">
            <input
                id="shared-person-history-filter-recent"
                name="person-history-sort-order"
                type="radio"
                value="recent"
                checked={value === "recent"}
                onChange={onChange}
            />
            <label className="shared-person-history-filter-option" htmlFor="shared-person-history-filter-recent">Most Recent</label>

            <input
                id="shared-person-history-filter-oldest"
                name="person-history-sort-order"
                type="radio"
                value="oldest"
                checked={value === "oldest"}
                onChange={onChange}
            />
            <label className="shared-person-history-filter-option" htmlFor="shared-person-history-filter-oldest">Oldest</label>

            <span className="shared-person-history-filter-background"></span>
        </div>
    )
}

export default PersonHistoryFilter