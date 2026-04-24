import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/index.routes.js"
import { notFound } from "./middlewares/not-found.middleware.js"
import { errorHandler } from "./middlewares/error.middleware.js"

dotenv.config()

const app = express()

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1)
}

app.disable("x-powered-by")
app.use(express.json({ limit: "100kb" }))
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))

app.use(router)

app.use(notFound)
app.use(errorHandler)

export default app
