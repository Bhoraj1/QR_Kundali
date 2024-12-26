import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.CONNECTIONS;

const connectDb = () => {
  mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.error(`Error connecting to MongoDB: ${err}`);
      process.exit(1);
    });
};

export default connectDb;
