import { getActiveSuppliersOptions, getAllSuppliers, getSupplierDetail } from "./suppliers.service.js"

export async function getSuppliers(req, res, next) {
    try {
        const storeId = req.store.storeId
        const { search = "" } = req.query
        const suppliers = await getAllSuppliers({storeId, search})

        res.json(suppliers)
    } catch (error) {
        next(error)
    }
}

export async function getSupplierById(req, res, next) {
    const { sort = "recent", page = 1 } = req.query
    const orderDirection = sort === 'oldest' ? 'ASC' : 'DESC'
    const { id } = req.params
    const currentPage = Number(page)
    const limit = 20
    const offset = (currentPage - 1) * limit


    try {
        const storeId = req.store.storeId
        const supplier = await getSupplierDetail({id, orderDirection, limit, offset, storeId})

        res.json(supplier)
    } catch (error) {
        next(error)
    }
}

export async function getSupplierOptions(req, res, next) {
    try {
        const storeId = req.store.storeId
        const suppliers = await getActiveSuppliersOptions({storeId})

        res.json(suppliers)
    } catch (error) {
        next(error)
    }
}