import { useState, useEffect } from 'react' 

import PageTitle from '../../../shared/ui/titles/page/PageTitle.jsx'
import CardLayout from '../../../shared/ui/layouts/card/CardLayout.jsx'

import { getWorkers } from '../api/workers.api.js'
import { mapWorkersToCards } from '../mappers/workers.mapper.js'

function Workers() {
    const [workers, setWorkers] = useState([])

    useEffect(() => {
        getWorkers().then((data) => {
            setWorkers(mapWorkersToCards(data))
        })
    }, [])

    return (
        <>
            <PageTitle  title="Your Workers" subtitle="In this section you can view your workers"/>
            <CardLayout data={workers} action="workers" route="workers"/>
        </>
    )
}

export default Workers