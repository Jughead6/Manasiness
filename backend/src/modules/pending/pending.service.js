import { badRequest } from "../../errors/http-errors.js"
import {
    findCustomersPending,
    findCustomersPendingSummary,
    findSuppliersPending,
    findSuppliersPendingSummary,
    findStaffPending,
    findStaffPendingSummary,
    resolveCustomerPending,
    resolveSupplierPending,
    resolveWorkerPending
} from "./pending.repository.js"

function createEmptySummary() {
    return {
        count: 0,
        total: 0
    }
}

export async function getPendingSummaryData(data) {
    const { storeId } = data

    const [customers, suppliers, workers] = await Promise.all([
        findCustomersPendingSummary({ storeId }),
        findSuppliersPendingSummary({ storeId }),
        findStaffPendingSummary({ storeId })
    ])

    return {
        customers,
        suppliers,
        workers,
        global: {
            count: customers.count + suppliers.count + workers.count,
            total: customers.total + suppliers.total + workers.total
        }
    }
}

export async function getUsersPending(data) {
    const { storeId, scope } = data

    if (scope === "customers") {
        return findCustomersPending({ storeId })
    }

    if (scope === "suppliers") {
        return findSuppliersPending({ storeId })
    }

    if (scope === "workers") {
        return findStaffPending({ storeId })
    }

    throw badRequest("scope invalid")
}

export async function resolvePendingItem(data) {
    const { storeId, scope, id, state } = data

    if (scope === "customers") {
        return resolveCustomerPending({ storeId, id, state })
    }

    if (scope === "suppliers") {
        return resolveSupplierPending({ storeId, id, state })
    }

    if (scope === "workers") {
        return resolveWorkerPending({ storeId, id, state })
    }

    throw badRequest("scope invalid")
}
