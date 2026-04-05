import './EntityLayout.css'

import EntityDetails from './information/EntityDetails.jsx'
import EntityActions from './toolbar/EntityActions.jsx'

function EntityLayout({ detail, onDesactivateClick }) {
    return (
        <div className="shared-entity-layout">
            <EntityDetails detail={detail} />
            <EntityActions onDesactivateClick={onDesactivateClick} />
        </div>
    )
}

export default EntityLayout