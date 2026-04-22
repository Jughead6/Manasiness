import { getUsersPending } from "./pending.service.js"

export async function getCustomersPending(req, res, next) {
    try {
        const storeId = req.store.storeId

        const customers = await getUsersPending({ storeId, role: "customer" })

        res.json(customers)
    } catch (error) {
        next(error)
    }
}

export async function getSuppliersPending(req, res, next) {
    try {
        const storeId = req.store.storeId

        const suppliers = await getUsersPending({ storeId, role: "supplier" })

        res.json(suppliers)
    } catch (error) {
        next(error)
    }
}

export async function getWorkersPending(req, res, next) {
    try {
        const storeId = req.store.storeId

        const workers = await getUsersPending({ storeId, role: "worker" })

        res.json(workers)
    } catch (error) {
        next(error)
    }
}
