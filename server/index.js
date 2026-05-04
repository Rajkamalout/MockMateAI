import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"

dotenv.config()

const app = express()

// ✅ CORS FIX (BEST PRACTICE)
const allowedOrigins = [
  "http://localhost:5173",
  "https://mockmateai-k6ph.onrender.com"
]

app.use(cors({
  origin: function (origin, callback) {
    // allow no-origin requests (postman / mobile / google popup)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    } else {
      return callback(new Error("CORS not allowed"))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

// ✅ IMPORTANT: Preflight handle karo
app.options("*", cors())

// ✅ Google popup issue fix
app.use((req, res, next) => {
  res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
  next()
})

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/payment", paymentRouter)

const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectDb()
})
