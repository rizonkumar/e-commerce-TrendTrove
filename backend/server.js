import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

// App Config
const app = express();
const PORT = process.env.PORT || 8080;
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  res.send("Welcome to TrendTrove Backend");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
