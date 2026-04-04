import './CardLayout.css'

import CardToolbar from './toolbar/CardToolbar.jsx'
import CardGrid from './content/CardGrid.jsx'

function CardLayout({ data, action, route }) {
    return (
        <div className="shared-card-layout">
            <CardToolbar action={action} />
            <CardGrid action={data} route={route} />
        </div>
    )
}

export default CardLayout
