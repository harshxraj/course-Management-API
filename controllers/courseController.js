const Joi = require("joi");
const prisma = require("../services/prisma");

const courseSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).required(),
  courseCode: Joi.string().alphanum().min(3).max(10).required(),
});

const getCourses = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    let where = {};

    if (search) {
      where = {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    const courses = await prisma.course.findMany({
      where,
      skip: parseInt(offset, 10),
      take: parseInt(limit, 10),
    });

    const totalCourses = await prisma.course.count({ where });

    return res.status(200).json({
      totalCourses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: parseInt(page, 10),
      courses,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(req.params.id, 10) },
      include: { lessons: true },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found!" });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const { error, value } = courseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const course = await prisma.course.create({ data: value });
    return res.status(201).json({ msg: "Course created successfully", course });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { error, value } = courseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const course = await prisma.course.update({
      where: { id: parseInt(req.params.id, 10) },
      data: value,
    });

    return res.status(200).json({ msg: "Course updated successfully", course });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    await prisma.course.delete({
      where: { id: parseInt(req.params.id, 10) },
    });

    return res.status(200).json({ msg: "Course deleted successfully" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };
