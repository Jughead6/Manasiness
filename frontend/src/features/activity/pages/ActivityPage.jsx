import { useEffect, useState } from "react"
import ActivityLayout from "../layout/ActivityLayout.jsx"
import { getGrowthRate, getDayPerformance, getCatalogPerformance } from "../api/activity.api.js"
import { growthRateMapper, dayPerformanceMapper, catalogPerformanceMapper } from "../mappers/activity.mapper.js"
import { useAuth } from "../../auth/context/useAuth.js"

function ActivityPage() {
    const { store } = useAuth()
    const currencyCode = store?.currency_code || "PEN"
    const [growthRate, setGrowthRate] = useState(null)
    const [dayPerformance, setDayPerformance] = useState(null)
    const [catalogPerformance, setCatalogPerformance] = useState(null)
    const [period, setPeriod] = useState("week")
    const [catalogOption, setCatalogOption] = useState("topSold")
    const [offset, setOffset] = useState(0)
    const [hasOlder, setHasOlder] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchActivity() {
            try {
                setIsLoading(true)
                const filters = { offset, activityDateFilter: period, catalogOption }

                const [growthRateData, dayPerformanceData, catalogPerformanceData] = await Promise.all([
                    getGrowthRate(filters),
                    getDayPerformance(filters),
                    getCatalogPerformance(filters)
                ])

                setGrowthRate(growthRateMapper(growthRateData))
                setDayPerformance(dayPerformanceMapper(dayPerformanceData, currencyCode))
                setCatalogPerformance(catalogPerformanceMapper(catalogPerformanceData))
                setHasOlder(growthRateData?.has_older ?? false)
            } catch {
                setGrowthRate(null)
                setDayPerformance(null)
                setCatalogPerformance(null)
                setHasOlder(false)
            } finally {
                setIsLoading(false)
            }
        }

        fetchActivity()
    }, [offset, period, catalogOption, currencyCode])

    return (
        <ActivityLayout
            title="Activity"
            description="On this page, you can view your activity in a more organized and straightforward way."
            growthRate={growthRate}
            dayPerformance={dayPerformance}
            catalogPerformance={catalogPerformance}
            period={period}
            setPeriod={setPeriod}
            catalogOption={catalogOption}
            setCatalogOption={setCatalogOption}
            offset={offset}
            setOffset={setOffset}
            hasOlder={hasOlder}
            isLoading={isLoading}
        />
    )
}

export default ActivityPage
