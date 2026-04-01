import './yourspacelayout.css'

import YourSpaceFilter from './filter/yourspacefilter'
import YourSpaceData from './data/yourspacedata'
import YourSpaceButtons from './buttons/yourspacebuttons'

function YourSpaceLayout() {
    return (
        <div id="yourspace-layout">
            <div id="yourspace-functions">
                <YourSpaceFilter/>
                <YourSpaceButtons/>
            </div>
            <div>
                <YourSpaceData/>
            </div>
        </div>
    )
}

export default YourSpaceLayout