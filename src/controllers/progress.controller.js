import Progress from "../models/progress.model.js";
import Lesson from "../models/lesson.model.js";
import Quiz from "../models/quiz.model.js";

// 1️⃣ Mark Lesson as Completed
async function completeLesson(req, res) {
  const userId = req.user.id;
  const { courseId, lessonId } = req.params;

  try {
    let progress = await Progress.findOne({ user: userId, course: courseId });
    if (!progress) {
      progress = new Progress({
        user: userId,
        course: courseId,
        completedLessons: [],
        quizAttempts: [],
      });
    }

    // Avoid duplicate lessons
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      await progress.save();
    }

    // ✅ Count total and completed lessons
    const totalLessons = await Lesson.countDocuments({ course: courseId });
    const completedCount = progress.completedLessons.length;
    const percent =
      totalLessons === 0
        ? 0
        : Math.round((completedCount / totalLessons) * 100);

    return res.status(200).json({
      msg: "Lesson marked as completed",
      completedLessons: completedCount,
      totalLessons,
      courseProgress: `${percent}%`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Failed to mark lesson", error: err.message });
  }
}

// 2️⃣ Attempt a Quiz
async function attemptQuiz(req, res) {
  const userId = req.user.id;
  const { courseId, quizId } = req.params;
  const { answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

    const total = quiz.questions.length;
    let score = 0;

    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) score++;
    });

    let progress = await Progress.findOne({ user: userId, course: courseId });
    if (!progress) {
      progress = new Progress({
        user: userId,
        course: courseId,
        completedLessons: [],
        quizAttempts: [],
      });
    }

    progress.quizAttempts.push({
      quiz: quizId,
      score,
      total,
    });

    await progress.save();

    return res.status(200).json({
      msg: "Quiz attempted",
      quizeScore: score,
      total,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Quiz attempt failed", error: err.message });
  }
}

// 3️⃣ Get Quiz Attempts
async function getQuizAttempts(req, res) {
  const userId = req.user.id;
  const { courseId, quizId } = req.params;

  try {
    const progress = await Progress.findOne({ user: userId, course: courseId });
    if (!progress) return res.status(404).json({ msg: "No progress found" });

    const attempts = progress.quizAttempts.filter(
      (q) => q.quiz.toString() === quizId
    );
    return res.status(200).json({ attempts });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Failed to fetch attempts", error: err.message });
  }
}

// 4️⃣ Get Overall Course Progress
async function getCourseProgress(req, res) {
  const userId = req.user.id;
  const { courseId } = req.params;

  try {
    const totalLessons = await Lesson.countDocuments({ course: courseId });

    const progress = await Progress.findOne({ user: userId, course: courseId });

    if (!progress) {
      return res.status(200).json({
        completedLessons: 0,
        totalLessons,
        courseProgress: "0%",
        quizAttempts: [],
      });
    }

    const completedCount = progress.completedLessons.length;

    // calculate percentage (rounded)
    const percent =
      totalLessons === 0
        ? 0
        : Math.round((completedCount / totalLessons) * 100);

    return res.status(200).json({
      completedLessons: completedCount,
      totalLessons,
      courseProgress: `${percent}%`,
      quizAttempts: progress.quizAttempts,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Failed to get course progress", error: err.message });
  }
}

export { completeLesson, attemptQuiz, getQuizAttempts, getCourseProgress };
