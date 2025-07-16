import Course from "../models/course.model.js";
import Lesson from "../models/lesson.model.js";
import Quiz from "../models/quiz.model.js";

async function createCourse(req, res) {
  const { title, description, instructor, price } = req.body;
  try {
    const course = new Course({ title, description, instructor, price });
    await course.save();
    // console.log("Course created:", course);
    return res.status(201).json({ course, msg: "Course created successfully" });
  } catch (err) {
    // console.error("Error creating course:", err);
    return res
      .status(500)
      .json({ msg: "Failed to create course", error: err.message });
  }
}

async function addLesson(req, res) {
  const { title, videoUrl, resourceLinks } = req.body;
  const courseId = req.params.courseId;
  console.log("Adding lesson to course:", courseId);
  try {
    const lesson = new Lesson({
      course: courseId,
      title,
      videoUrl,
      resourceLinks,
    });
    await lesson.save();
    return res.status(201).json({ lesson, msg: "Lesson added successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Failed to add lesson", error: err.message });
  }
}

async function addQuiz(req, res) {
  const courseId = req.params.courseId;
  const { questions } = req.body;
  console.log("Adding quiz to course:", courseId);
  try {
    const quiz = new Quiz({ course: courseId, questions });
    await quiz.save();
    return res.status(201).json({ msg: "Quiz added successfully", quiz });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Failed to add quiz", error: err.message });
  }
}

async function getAllCourses(req, res) {
  // Get page & limit from query string, or use defaults
  const page = parseInt(req.query.page) || 1; // default: page 1
  const limit = parseInt(req.query.limit) || 10; // default: 10 per page
  try {
    const total = await Course.countDocuments();
    const courses = await Course.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).json({
      // page,
      // limit,
      // total,
      // totalPages: Math.ceil(total / limit),
      courses,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to fetch courses" });
  }
}

async function getCourseById(req, res) {
  const courseId = req.params.id;
  try {
    const course = await Course.findById(courseId);
    const lessons = await Lesson.find({ course: courseId });
    const quizzes = await Quiz.find({ course: courseId });
    res.json({ course, lessons, quizzes });
  } catch (err) {
    res.status(500).json({ msg: "Failed to get course details" });
  }
}

export { createCourse, addLesson, addQuiz, getAllCourses, getCourseById };
