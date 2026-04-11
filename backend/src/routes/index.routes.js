import { Router } from "express"
import { verifyToken } from "../middlewares/auth.middleware.js"

import categoriesRoutes from "../modules/categories/categories.routes.js"
import productsRoutes from "../modules/products/products.routes.js"
import usersRoutes from "../modules/users/users.routes.js"
import salesRoutes from "../modules/sales/sales.routes.js"
import ordersRoutes from "../modules/orders/orders.routes.js"
import staffRoutes from "../modules/staff/staff.routes.js"
import customersRoutes from "../modules/customers/customers.routes.js"
import workersRoutes from "../modules/workers/workers.routes.js"
import suppliersRoutes from "../modules/suppliers/suppliers.routes.js"
import authRoutes from "../modules/auth/auth.routes.js"

const router = Router()

router.use("/auth", authRoutes)

router.use(verifyToken)
router.use("/categories", categoriesRoutes)
router.use("/products", productsRoutes)
router.use("/users", usersRoutes)
router.use("/sales", salesRoutes)   
router.use("/orders", ordersRoutes)
router.use("/staff", staffRoutes)
router.use("/customers", customersRoutes)
router.use("/workers", workersRoutes)
router.use("/suppliers", suppliersRoutes)

export default router