import './sectionsearch.css'
import { Search } from "lucide-react"

function SearchBar({action}) {
    return (
        <div>
            <form id="categories-searchform">
                <div id="categories-searchbar">
                    <Search id="categories-searchicon" />
                    <input id="categories-searchinput" placeholder={`Search ${action}`} type="text" />
                </div>
            </form>
        </div>
    )
}

export default SearchBar