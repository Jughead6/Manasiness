import "./ActivityToolbarFilter.css"

function ActivityToolbarFilter({ filterGroups = [] }) {
    const safeFilterGroups = Array.isArray(filterGroups) ? filterGroups : []

    if (!safeFilterGroups.length) {
        return null
    }

    return (
        <div className="activity-toolbar-filters">
            {safeFilterGroups.map((group) => (
                <label className="activity-toolbar-filter" key={group.key}>
                    <span>{group.label}</span>
                    <select value={group.value} onChange={group.onChange}>
                        {group.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                </label>
            ))}
        </div>
    )
}

export default ActivityToolbarFilter