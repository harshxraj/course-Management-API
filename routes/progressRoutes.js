const express = require("express");
const { getUserProgress, updateProgress } = require("../controllers/progressController");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/users/:id/progress", authenticateToken, authorizeRole(["STUDENT", "TEACHER"]), getUserProgress);
router.post("/users/:id/progress", authenticateToken, authorizeRole(["STUDENT", "TEACHER"]), updateProgress);

module.exports = router;
