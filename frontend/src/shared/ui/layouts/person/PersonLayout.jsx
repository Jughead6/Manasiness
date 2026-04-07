import "./PersonLayout.css"

import PersonToolbar from "./toolbar/PersonToolbar.jsx"
import PersonHistory from "./information/PersonHistory.jsx"
import PersonActions from "./buttons/PersonActions.jsx"

function PersonLayout({ data, columns, sectionTitle }) {
    return (
        <div className="shared-person-layout">
            <PersonToolbar/>
            <PersonHistory data={data} columns={columns} sectionTitle={sectionTitle}/>
            <PersonActions/>
        </div>
    )
}

export default PersonLayout
