import { Search } from "lucide-react"
import "./CardSearchInput.css"

function CardSearchInput({ action }) {
    return (
        <form className="shared-card-search-form">
            <label className="shared-card-search-label" htmlFor="shared-card-search-input">
                Search {action}
            </label>
            <div className="shared-card-searchbar">
                <Search />
                <input
                    id="shared-card-search-input"
                    name="card-search-query"
                    className="shared-card-search-input"
                    placeholder={`Search ${action}`}
                    type="text"
                />
            </div>
        </form>
    )
}

export default CardSearchInput
