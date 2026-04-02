import './userslayout.css'

import UsersSearch from './search/userssearch'
import UsersContent from './content/userscontent'

function UsersLayout() {
    return (
        <div id="users-layout">
            <UsersSearch/>
            <UsersContent/>
        </div>
    )
}

export default UsersLayout