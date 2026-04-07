import express from "express"
import cors from "cors"

import categoriesRoutes from "./routes/categories.routes.js"
import productsRoutes from "./routes/products.routes.js"
import usersRoutes from "./routes/users.routes.js"
import salesRoutes from "./routes/sales.routes.js"
import ordersRoutes from "./routes/orders.routes.js"
import staffRoutes from "./routes/staff.routes.js"
import customersRoutes from "./routes/customers.routes.js"
import workersRoutes from "./routes/workers.routes.js"
import suppliersRoutes from "./routes/suppliers.routes.js"
import playgroundRoutes from "../playground/routes/playground.routes.js"

const app = express()

app.use(express.json())
app.use(cors())


app.use("/categories", categoriesRoutes)
app.use("/products", productsRoutes)
app.use("/users", usersRoutes)
app.use("/sales", salesRoutes)
app.use("/orders", ordersRoutes)
app.use("/staff", staffRoutes)
app.use("/customers", customersRoutes)
app.use("/workers", workersRoutes)
app.use("/suppliers", suppliersRoutes)
app.use("/playground", playgroundRoutes)

export default app