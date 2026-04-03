import './toolbar.css'

import SearchBar from './searchbar/searchbar'

function ToolBarCard({ action }) {
    return (
        <div className="toolbar">
            <SearchBar action={action}/>
        </div>
    )
}

export default ToolBarCard