import './PersonToolbar.css'

import PersonHistoryFilter from './filter/PersonHistoryFilter.jsx'

function PersonToolbar() {
    return (
        <div className="shared-person-toolbar">
            <PersonHistoryFilter />
        </div>
    )
}

export default PersonToolbar
