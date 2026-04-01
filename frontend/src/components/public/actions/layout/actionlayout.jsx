import './actionlayout.css'

import ActionFilter from './filter/actionfilter.jsx'
import ActionSearch from './search/actionsearch.jsx'
import ActionButtons from './buttons/actionbuttons.jsx'

function ActionLayout() {
    return (
        <div id="action-layout">
            <ActionSearch action="categories"/>
            <ActionFilter/>
            <ActionButtons/>
        </div>
    )
}

export default ActionLayout