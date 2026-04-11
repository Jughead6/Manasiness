import { Search } from "lucide-react"
import "./CardSearchInput.css"

function CardSearchInput({ action, value = "", onChange }) {
    return (
        <form className="shared-card-search-form" onSubmit={(e) => e.preventDefault()}>
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
                    value={value}
                    onChange={onChange}
                />
            </div>
        </form>
    )
}

export default CardSearchInput
