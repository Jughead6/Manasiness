import { getPendingSummaryData, getUsersPending, resolvePendingItem } from "./pending.service.js"
import { requireAllowedValue, requirePositiveInteger } from "../../utils/validators/index.js"

const PENDING_SCOPES = ["customers", "suppliers", "workers"]
const PENDING_STATES = ["paid", "canceled"]

export async function getPendingSummary(req, res, next) {
    try {
        const storeId = req.store.storeId
        const summary = await getPendingSummaryData({ storeId })

        res.json(summary)
    } catch (error) {
        next(error)
    }
}

export async function getCustomersPending(req, res, next) {
    try {
        const storeId = req.store.storeId

        const customers = await getUsersPending({ storeId, scope: "customers" })

        res.json(customers)
    } catch (error) {
        next(error)
    }
}

export async function getSuppliersPending(req, res, next) {
    try {
        const storeId = req.store.storeId

        const suppliers = await getUsersPending({ storeId, scope: "suppliers" })

        res.json(suppliers)
    } catch (error) {
        next(error)
    }
}

export async function getWorkersPending(req, res, next) {
    try {
        const storeId = req.store.storeId

        const workers = await getUsersPending({ storeId, scope: "workers" })

        res.json(workers)
    } catch (error) {
        next(error)
    }
}

export async function updatePendingState(req, res, next) {
    try {
        const storeId = req.store.storeId
        const id = requirePositiveInteger(req.params.id, "id")
        const scope = requireAllowedValue(req.params.scope, PENDING_SCOPES, "scope")
        const state = requireAllowedValue(req.body.state, PENDING_STATES, "state")

        const record = await resolvePendingItem({ storeId, scope, id, state })

        res.json({
            message: "Update successfully",
            record
        })
    } catch (error) {
        next(error)
    }
}
