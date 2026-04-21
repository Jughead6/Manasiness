import ActivityLayout from "../layout/ActivityLayout"
import { useState, useEffect } from "react"
import { getGrowthRate, getDayPerformance, getCatalogPerformance } from "../api/activity.api"
import { growthRateMapper, dayPerformanceMapper, catalogPerformanceMapper } from "../mappers/activity.mapper"

function ActivityPage() {
    const [growthRate, setGrowthRate] = useState(null)
    const [dayPerformance, setDayPerformance] = useState(null)
    const [catalogPerformance, setCatalogPerformance] = useState(null)
    const [activityDateFilter, setActivityDateFilter] = useState("week")
    const [catalogOption, setCatalogOption] = useState("topSold")
    const [offset, setOffset] = useState(0)
    const [hasPrevious, setHasPrevious] = useState(false)

    useEffect(() => {
        async function fetchActivity() {
            try {
                const filters = { offset, activityDateFilter, catalogOption }

                const growthRateData = await getGrowthRate(filters)
                const dayPerformanceData = await getDayPerformance(filters)
                const catalogPerformanceData = await getCatalogPerformance(filters)

                setGrowthRate(growthRateMapper(growthRateData))
                setDayPerformance(dayPerformanceMapper(dayPerformanceData))
                setCatalogPerformance(catalogPerformanceMapper(catalogPerformanceData))
                setHasPrevious(growthRateData.has_older)
            } catch {
                setGrowthRate(null)
                setDayPerformance(null)
                setCatalogPerformance(null)
                setHasPrevious(false)
            }
        }

        fetchActivity()
    }, [offset, activityDateFilter, catalogOption])

    return (
        <ActivityLayout
            title="Activity"
            description="On this page, you can view your activity in a more organized and straightforward way."
            growthRate={growthRate}
            dayPerformance={dayPerformance}
            catalogPerformance={catalogPerformance}
            activityDateFilter={activityDateFilter}
            setActivityDateFilter={setActivityDateFilter}
            setCatalogOption={setCatalogOption}
            offset={offset}
            setOffset={setOffset}
            hasPrevious={hasPrevious}
        />
    )
}

export default ActivityPage