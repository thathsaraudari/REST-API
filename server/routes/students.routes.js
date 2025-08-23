const router = require("express").Router();
const Student = require("../models/students.js");

//CREATE a student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({
      message: "Failed to create student",
      error: err.message,
    });
  }
});

//READ all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find()
      .populate("cohort"); 
    res.json(students);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get students",
      error: err.message,
    });
  }
});

//READ students by cohort
router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const students = await Student.find({ cohort: cohortId })
      .populate("cohort");
    res.json(students);
  } catch (err) {
    res.status(400).json({
      message: "Failed to get students by cohort",
      error: err.message,
    });
  }
});

//READ a single student by id 
router.get("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId)
      .populate("cohort");

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({
      message: "Invalid student id",
      error: err.message,
    });
  }
});

//UPDATE a student
router.put("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({
      message: "Failed to update student",
      error: err.message,
    });
  }
});

//DELETE a student
router.delete("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const deleted = await Student.findByIdAndDelete(studentId);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({
      message: "Failed to delete student",
      error: err.message,
    });
  }
});

module.exports = router;
