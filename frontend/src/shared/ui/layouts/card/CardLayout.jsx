import './CardLayout.css'

import CardToolbar from './toolbar/CardToolbar.jsx'
import CardGrid from './content/CardGrid.jsx'

function CardLayout({ data, action, route, onCreateClick }) {
    return (
        <div className="shared-card-layout">
            <CardToolbar action={action} onCreateClick={onCreateClick}/>
            <CardGrid action={data} route={route}/>
        </div>
    )
}

export default CardLayout
