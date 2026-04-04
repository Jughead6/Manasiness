import './PersonActions.css'

import { StepForward, StepBack, } from 'lucide-react'

function PersonActions() {
    return (
        <div className="shared-person-actions">
            <button><StepBack/></button>
            <button><StepForward/></button>
        </div>
    )
}

export default PersonActions