import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port: number = 4000;

// Routes
import authRoute from "./routes/authRoutes";
import userRoute from "./routes/userRoutes";

//Connect DB

// console.log(process.env.MONGO_URI);
import ConnectDB from "./config/db";
ConnectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes Middleware
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello there!!!!!!!!!!!!");
});

const server = app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

export { app, server };
