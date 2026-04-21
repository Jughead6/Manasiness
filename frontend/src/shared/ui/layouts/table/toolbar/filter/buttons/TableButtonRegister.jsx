import "./TableButtonRegister.css"
import { ClipboardPlus } from "lucide-react"

function TableButtonRegister({onCreateClick}) {
    return (
        <div className="table-button-register">
            <button type="button" onClick={onCreateClick}><ClipboardPlus/>Register</button>
        </div>
    )
}

export default TableButtonRegister