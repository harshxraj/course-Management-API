const prisma = require("../services/prisma");

const getProgress = async (req, res) => {
  try {
    const progress = await prisma.progress.findMany({
      where: { userId: parseInt(req.params.id, 10) },
      include: { course: true },
    });
    return res.status(200).json(progress);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateProgress = async (req, res) => {
  const { courseId, progress } = req.body;
  try {
    const updatedProgress = await prisma.progress.upsert({
      where: {
        userId_courseId: {
          userId: parseInt(req.params.id, 10),
          courseId: parseInt(courseId, 10),
        },
      },
      update: { progress },
      create: {
        progress,
        userId: parseInt(req.params.id, 10),
        courseId: parseInt(courseId, 10),
      },
    });
    res.json(updatedProgress);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = { getProgress, updateProgress };
