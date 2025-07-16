import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

//configure env
dotenv.config({
  path: "./path",
});

//calling database connection function---> if succesfull then listen else error
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
