import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // console.log("ERROR connection db:", error);
    // process.exit(1); // Exit the process on DB connection failure
    console.error("ERROR connecting to the database:");
    console.error("Message:", error.message);
    console.error("Name:", error.name);
    console.error("Stack:", error.stack);
    process.exit(1); // Exit the process on DB connection failure
  }
};

export default connectDB;
