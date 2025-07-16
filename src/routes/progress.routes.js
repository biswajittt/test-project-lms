import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  completeLesson,
  attemptQuiz,
  getQuizAttempts,
  getCourseProgress,
} from "../controllers/progress.controller.js";

const router = express.Router();

router.post(
  "/:courseId/lessons/:lessonId/complete",
  verifyToken,
  completeLesson
);
router.post("/:courseId/quiz/:quizId/attempt", verifyToken, attemptQuiz);
router.get("/:courseId/quiz/:quizId/attempts", verifyToken, getQuizAttempts);
router.get("/:courseId", verifyToken, getCourseProgress);

export default router;
