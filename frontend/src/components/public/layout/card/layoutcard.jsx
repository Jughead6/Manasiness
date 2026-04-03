import './layoutcard.css'

import ToolBarCard from './toolbar/toolbar.jsx'
import CardContent from './content/cardcontent.jsx'

function LayoutCard({ data, action, route }) {
    return (
        <div className="layout-card">
            <ToolBarCard action={action}/>
            <CardContent action={data} route={route}/>
        </div>
    )
}

export default LayoutCard