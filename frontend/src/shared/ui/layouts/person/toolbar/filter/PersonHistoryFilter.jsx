import './PersonHistoryFilter.css'

function PersonHistoryFilter() {
    return (
            <select className="shared-person-history-filter">
                <option value="week">1 week</option>
                <option value="month">1 month</option>
                <option value="year">1 year</option>
            </select>

    )
}

export default PersonHistoryFilter