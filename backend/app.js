import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import router from "./router/loginSignupRouter.js";
import router2 from "./router/generator-route.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
dotenv.config();

const app = express();
app.use(morgan("dev"))
app.use(cookieParser());
app.use(express.json()); // Middleware to parse JSON bodies

//MongoDB connection
connectDb();

//Dynamic folder for deployment in render
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 8080;
// app.use(express.static("public"));

app.use("/api/v1", router);
app.use("/api/v1", router2);

//for deployment in render
app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend','dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  // promptUser();
});

