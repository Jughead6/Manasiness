import { getActiveSuppliersOptions, getAllSuppliers, getSupplierDetail } from "./suppliers.service.js"

export async function getSuppliers(req, res, next) {
    try {
        const suppliers = await getAllSuppliers()

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
        const supplier = await getSupplierDetail(id, orderDirection, limit, offset)

        if (!supplier) {
            return res.status(404).json({ error: 'Supplier not found' })
        }

        res.json(supplier)
    } catch (error) {
        next(error)
    }
}

export async function getSupplierOptions(req, res, next) {
    try {
        const suppliers = await getActiveSuppliersOptions()

        res.json(suppliers)
    } catch (error) {
        next(error)
    }
}