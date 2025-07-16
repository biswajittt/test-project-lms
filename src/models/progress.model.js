import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  score: Number,
  total: Number,
  timestamp: { type: Date, default: Date.now },
});

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  quizAttempts: [quizAttemptSchema],
});

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
