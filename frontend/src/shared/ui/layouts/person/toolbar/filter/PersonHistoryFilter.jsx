import "./PersonHistoryFilter.css"

function PersonHistoryFilter({ value, onChange }) {
    return (
        <select className="shared-person-history-filter" value={value} onChange={onChange}>
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
        </select>
    )
}

export default PersonHistoryFilter