import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/index.routes.js"
import { notFound } from "./middlewares/not-found.middleware.js"
import { errorHandler } from "./middlewares/error.middleware.js"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(router)

app.use(notFound)
app.use(errorHandler)

export default app