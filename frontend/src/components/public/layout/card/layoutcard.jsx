import './layoutcard.css'

import ToolBarCard from './toolbar/toolbar.jsx'
import CardContent from './content/cardcontent.jsx'

function LayoutCard({ action }) {
    return (
        <div id="layout-card">
            <ToolBarCard action="categories"/>
            <CardContent action={action}/>
        </div>
    )
}

export default LayoutCard