import './searchbar.css'
import { Search } from "lucide-react"

function SearchBar({ action }) {
    return (
        
            <form>
                <div className="searchbar-card">
                    <Search/>
                    <input className="searchinput" placeholder={`Search ${action}`} type="text" />
                </div>
            </form>
    
    )
}

export default SearchBar