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

// ✅ STEP 1: CORS OPTIONS (TOP pe banao)
const corsOptions = {
  origin: function (origin, callback) {
   const allowedOrigins = [
  "http://localhost:5173",
  "https://mockmateai-k6ph.onrender.com",
  "https://mockmateai-k6ph.onrender.com/"
];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/payment", paymentRouter)

// ✅ SERVER START
const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectDb()
})
