import { badRequest } from "../../errors/http-errors.js"
import { findCustomersPending, findSuppliersPending, findStaffPending } from "./pending.repository.js"

export async function getUsersPending(data) {
    const { storeId, role } = data

    if (role === "customer") {
        return findCustomersPending({ storeId })
    }

    if (role === "supplier") {
        return findSuppliersPending({ storeId })
    }

    if (role === "worker") {
        return findStaffPending({ storeId })
    }

    throw badRequest("role invalid")
}
