const express = require("express");
const { getProgress, updateProgress } = require("../controllers/progressController");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/users/:id/progress", authenticateToken, authorizeRole(["STUDENT", "TEACHER"]), getProgress);
router.post("/users/:id/progress", authenticateToken, authorizeRole(["TEACHER"]), updateProgress);

module.exports = router;
