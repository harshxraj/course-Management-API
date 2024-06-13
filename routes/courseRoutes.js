const express = require("express");
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/courses", authenticateToken, getCourses);
router.get("/courses/:id", authenticateToken, getCourseById);
router.post("/courses", authenticateToken, authorizeRole(["TEACHER"]), createCourse);
router.put("/courses/:id", authenticateToken, authorizeRole(["TEACHER"]), updateCourse);
router.delete("/courses/:id", authenticateToken, authorizeRole(["TEACHER"]), deleteCourse);

module.exports = router;
