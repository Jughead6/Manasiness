import express from "express"
import cors from "cors"
import router from "./routes/index.routes.js"
import { notFound } from "./middlewares/not-found.middleware.js"
import { errorHandler } from "./middlewares/error.middleware.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use(router)

app.use(notFound)
app.use(errorHandler)

export default app