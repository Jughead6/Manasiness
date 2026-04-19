import { badRequest } from "../../errors/http-errors.js"
import { findCustomersPending, findSuppliersPending, findStaffPending } from "./pending.repository.js"

export async function getUsersPending(data) {
    const storeId = data.storeId
    const rol = data.rol

    if(rol === "customer") {
        return findCustomersPending({storeId})
    }
    if(rol === "supplier") {
        return findSuppliersPending({storeId})
    }
    if(rol ===  "worker") {
        return findStaffPending({storeId})
    }
    
    throw badRequest("rol invalid")
    
}
