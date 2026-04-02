import '../pages.css'
import { useState, useEffect } from 'react' 

import PageTitle from '../../components/public/pages/pagetitle.jsx'
import LayoutCard from '../../components/public/layout/card/layoutcard.jsx'
import { getWorkers } from '../../components/content/users/workerscontent'

function Workers() {
    const [workers, setWorkers] = useState([])

    useEffect(() => {
        getWorkers().then(setWorkers)
    }, [])

    return (
        <div className="page">
            <PageTitle  title="Your Workers" subtitle="In this section you can view your workers"/>
            <LayoutCard action={workers} />
        </div>
    )
}

export default Workers