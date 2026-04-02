import './toolbar.css'

import SearchBar from './searchbar/searchbar'

function ToolBarCard({ action }) {
    return (
        <div id="action-search">
            <SearchBar action={action}/>
        </div>
    )
}

export default ToolBarCard