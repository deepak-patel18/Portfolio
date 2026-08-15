const express = require("express");
const router = express.Router();

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

// Public
router.get("/", getProjects);

// Protected - Admin
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;