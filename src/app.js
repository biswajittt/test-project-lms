import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { apiLimiter } from "./middlewares/rateLimiter.middleware.js";

const app = express();

//cors
app.use(
  cors({
    origin: "http://localhost:5173", // Only allow your frontend to access the backend
    // origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"], // Ensure Authorization is allowed
  })
);
app.use(apiLimiter); // put this before your routes
//defining limitation to json file size
app.use(express.json({ limit: "16kb" }));

//url encoder
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//for public files
app.use(express.static("public"));

//using cookie parser
app.use(cookieParser());

//routers
// import studentRouter from "./routes/student.routes.js";
// import bookClassRouter from "./routes/bookclass.routes.js";
// import mentorRouter from "./routes/mentor.routes.js";
import authRouter from "./routes/auth.routes.js";
import courseRouter from "./routes/course.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import progressRoutes from "./routes/progress.routes.js";

// import userRouter from "./routes/user.routes.js";
// import connectionRouter from "./routes/connection.routes.js";
// //routes declaration
// /*auth route*/
app.use("/api/lms/", authRouter);
app.use("/api/lms/courses", courseRouter);
app.use("/api/lms/enrollments", enrollmentRoutes);
app.use("/api/lms/progress", progressRoutes);
// /*auth route*/
// app.use("/api/v1/student/", studentRouter); // redirectiong to 'userRouter after '
// app.use("/api/v1/bookclass", bookClassRouter);
// app.use("/api/v1/mentor/", mentorRouter);

// /* connection route */
// app.use("/api/v1/mentor/connection/", connectionRouter);
// //common for all user
// app.use("/api/v1/user/", userRouter);
export { app };
