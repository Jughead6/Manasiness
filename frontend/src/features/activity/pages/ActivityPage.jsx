import ActivityLayout from "../layout/ActivityLayout"
import { useState, useEffect } from "react"
import { getGrowthRate, getDayPerformance, getCatalogPerformance } from "../api/activity.api"
import { growthRateMapper, dayPerformanceMapper, catalogPerformanceMapper } from "../mappers/activity.mapper"

function ActivityPage() {
    const [growthRate, setGrowthRate] = useState(null)
    const [dayPerformance, setDayPerformance] = useState(null)
    const [catalogPerformance, setCatalogPerformance] = useState(null)

    useEffect(() => {
        async function fetchActivity() {
            try {
                const growthRate = await getGrowthRate()
                setGrowthRate(growthRateMapper(growthRate))
                const dayPerformance = await getDayPerformance()
                setDayPerformance(dayPerformanceMapper(dayPerformance))
                const catalogPerformance = await getCatalogPerformance()
                setCatalogPerformance(catalogPerformanceMapper(catalogPerformance))
            } catch {
                setGrowthRate(null)
                setDayPerformance(null)
                setCatalogPerformance(null)
            }

        }
        fetchActivity()
    }, [])

    return (
        <ActivityLayout
            title="Activity"
            description="On this page, you can view your activity in a more organized and straightforward way."
            growthRate={growthRate}
            dayPerformance={dayPerformance}
            catalogPerformance={catalogPerformance}
        />
    )
}

export default ActivityPage