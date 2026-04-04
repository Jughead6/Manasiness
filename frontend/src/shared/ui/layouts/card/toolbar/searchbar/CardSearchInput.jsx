import './CardSearchInput.css'
import { Search } from "lucide-react"

function CardSearchInput({ action }) {
    return (
        <form>
            <div className="shared-card-searchbar">
                <Search />
                <input className="shared-card-search-input" placeholder={`Search ${action}`} type="text" />
            </div>
        </form>
    )
}

export default CardSearchInput
