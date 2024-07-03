const Teacher = require("../models/Teachers.model");
const router = require("express").Router();

// creates new teacher
router.post("/api/teachers", async (req, res, next) => {
  try {
    const createTeacher = await Teacher.create(req.body);
    res.status(201).json(createTeacher);
  } catch (error) {
    next(error);
  }
});

// fetches specific teacher
router.get("/api/teachers/:teacherId", async (req, res, next) => {
  const { teacherId } = req.params;
  try {
    const getTeacher = await Teacher.findById(teacherId).populate('availability');
    console.log(getTeacher);
    res.status(200).json(getTeacher);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// fetches all teachers 
router.get("/api/teachers", async (req, res, next) => {
  try {
    const findAllTeachers = await Teacher.find();
    console.log(findAllTeachers);
    res.status(200).json(findAllTeachers);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
