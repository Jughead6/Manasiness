import './userssearch.css'
import { Search } from "lucide-react"

function UsersSearch() {
    return (
        <div id="users-search">
            <form id="users-searchform">
                <div id="users-searchbar">
                    <Search id="users-searchicon" />
                    <input id="users-searchinput" placeholder={`Search customers`} type="text" />
                </div>
            </form>
        </div>
    )
}

export default UsersSearch