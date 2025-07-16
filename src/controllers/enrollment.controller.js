import User from "../models/user.model.js";
import Course from "../models/course.model.js";

//user enrolls in a course
async function enrollInCourse(req, res) {
  const userId = req.user.id;
  const courseId = req.params.courseId;
  console.log("User ID:", userId, "Course ID:", courseId);
  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ msg: "User or Course not found" });
    }
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ msg: "Already enrolled in this course" });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    return res.status(200).json({ msg: "Enrolled successfully", courseId });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Enrollment failed", error: err.message });
  }
}
// Get all courses a user is enrolled in
async function getEnrolledCourses(req, res) {
  try {
    const user = await User.findById(req.user.id).populate("enrolledCourses");
    // console.log("User enrolled courses:", user);
    return res.status(200).json({ enrolledCourses: user.enrolledCourses });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Failed to get enrolled courses", error: err.message });
  }
}
// Get all users enrolled in a specific course (admin only)
async function getUsersInCourse(req, res) {
  const courseId = req.params.courseId;

  try {
    const users = await User.find({ enrolledCourses: courseId }).select(
      "name email"
    );
    res.status(200).json({ enrolledUsers: users });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to fetch enrolled users", error: err.message });
  }
}

export { enrollInCourse, getEnrolledCourses, getUsersInCourse };
