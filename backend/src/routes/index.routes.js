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
import statsRoutes from "../modules/stats/stats.routes.js"
import incomeRoutes from "../modules/income/income.routes.js"
import expensesRoutes from "../modules/expenses/expenses.routes.js"
import pendingRoutes from "../modules/pending/pending.routes.js"
import activityRoutes from "../modules/activity/activity.routes.js"

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
router.use("/stats", statsRoutes)
router.use("/income", incomeRoutes)
router.use("/expenses", expensesRoutes)
router.use("/pending", pendingRoutes)
router.use("/activity", activityRoutes)

export default router