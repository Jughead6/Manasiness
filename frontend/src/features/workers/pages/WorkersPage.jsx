import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import { getWorkers } from "../api/workers.api.js"
import { mapWorkersToCards } from "../mappers/workers.mapper.js"

function WorkersPage() {
    const [workers, setWorkers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        async function fetchWorkers() {
            try {
                const response = await getWorkers(searchTerm)
                setWorkers(mapWorkersToCards(response))
            } catch {
                toast.error("Could not load workers")
            }
        }
        fetchWorkers()
    }, [searchTerm])

    function handleSearchChange(e) {
        setSearchTerm(e.target.value)
    }

    return (
        <CardLayout 
            title="Your Workers" 
            subtitle="In this section you can view your workers"
            data={workers} 
            action="Workers" 
            route="workers"
            searchValue={searchTerm}
            onSearchChange={handleSearchChange}
        />
    )
}

export default WorkersPage