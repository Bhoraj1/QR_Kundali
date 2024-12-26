import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import router from "./router/loginSignupRouter.js";
import router2 from "./router/generator-route.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
dotenv.config();

const app = express();
app.use(morgan("dev"))
app.use(cookieParser());
app.use(express.json()); // Middleware to parse JSON bodies

//MongoDB connection
connectDb();

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

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  // promptUser();
});
{
  /*import LoginModel from "./models/loginSchema.js";
app.get("/watch", async (req, res) => {
  try {
    const users = await LoginModel.find(); // Using async/await
    res.send(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server Error");
  }
}); */
}
