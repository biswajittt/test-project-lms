import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  title: String,
  videoUrl: String,
  resourceLinks: [String],
});

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;
