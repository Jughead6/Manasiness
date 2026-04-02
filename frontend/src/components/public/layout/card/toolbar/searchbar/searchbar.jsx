import './searchbar.css'
import { Search } from "lucide-react"

function SearchBar({ action }) {
    return (
        
            <form>
                <div id="searchbar-card">
                    <Search/>
                    <input id="action-searchinput" placeholder={`Search ${action}`} type="text" />
                </div>
            </form>
    
    )
}

export default SearchBar