const prisma = require("../services/prisma");

const getUserProgress = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { Progress: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    return res.status(200).json(user.Progress);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProgress = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { courseId, progress } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found!" });
    }

    // Updating or creating progress for the user and course
    const updatedProgress = await prisma.progress.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { progress },
      create: { progress, userId, courseId },
      include: { course: true },
    });

    return res.status(200).json({ msg: "Progress updated successfully", progress: updatedProgress });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getUserProgress, updateProgress };
