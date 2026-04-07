import { useState, useEffect } from "react" 
import PageTitle from "../../../shared/ui/titles/page/PageTitle.jsx"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import { getWorkers } from "../api/workers.api.js"
import { mapWorkersToCards } from "../mappers/workers.mapper.js"

function WorkersPage() {
    const [workers, setWorkers] = useState([])

    useEffect(() => {
        async function fetchWorkers() {
            try {
                const response = await getWorkers()
                setWorkers(mapWorkersToCards(response))
            } catch (error) {
                console.log(error)
            }
        }
        fetchWorkers()
    }, [])

    return (
        <>
            <PageTitle 
                title="Your Workers" 
                subtitle="In this section you can view your workers"
            />
            <CardLayout 
                data={workers} 
                action="Workers" 
                route="workers"
            />
        </>
    )
}

export default WorkersPage