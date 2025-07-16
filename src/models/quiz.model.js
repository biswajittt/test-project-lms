import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correctAnswer: Number,
});

const quizSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  questions: [questionSchema],
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
