import './actionsearch.css'
import { Search } from "lucide-react"

function ActionSearch({ action }) {
    return (
        <div>
            <form id="action-searchform">
                <div id="action-searchbar">
                    <Search id="action-searchicon" />
                    <input id="action-searchinput" placeholder={`Search ${action}`} type="text" />
                </div>
            </form>
        </div>
    )
}

export default ActionSearch