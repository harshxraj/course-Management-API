const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../services/prisma");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (username.length < 3) {
      return res.status(400).json({ error: "Username should be atleast of 3 letters" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password should be atleast of 6 letters" });
    }

    if (role !== "STUDENT" && role !== "TEACHER") {
      return res.status(400).json({
        error: "Invalid role. Valid roles are 'STUDENT' and 'TEACHER'",
      });
    }
    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ error: "User already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword, role },
    });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);

    return res.status(201).json({ username: user.username, role: user.role, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: "User does not exist!" });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
      return res.json({
        msg: "Login Successful",
        username: user.username,
        role: user.role,
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };
