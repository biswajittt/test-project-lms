import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
  enrollInCourse,
  getEnrolledCourses,
  getUsersInCourse,
} from "../controllers/enrollment.controller.js";

const router = express.Router();

router.post("/:courseId/enroll", verifyToken, enrollInCourse); // user enroll
router.get("/my-courses", verifyToken, getEnrolledCourses); // user view own
router.get(
  "/:courseId/users",
  verifyToken,
  authorizeRoles("admin"),
  getUsersInCourse
); // admin only

export default router;
