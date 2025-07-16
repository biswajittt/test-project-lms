import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
  createCourse,
  addLesson,
  addQuiz,
  getAllCourses,
  getCourseById,
} from "../controllers/course.controller.js";

const router = express.Router();

// Public
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Admin only
router.post("/add-course", verifyToken, authorizeRoles("admin"), createCourse);

router.post(
  "/:courseId/lessons",
  verifyToken,
  authorizeRoles("admin"),
  addLesson
);

router.post(
  "/:courseId/quizzes",
  verifyToken,
  authorizeRoles("admin"),
  addQuiz
);

export default router;
