const Teacher = require("../models/Teachers.model");
const router = require("express").Router();

router.post("/api/teachers", async (req, res, next) => {
  try {
    const createTeacher = await Teacher.create(req.body);
    res.status(201).json(createTeacher);
  } catch (error) {
    next(error);
  }
});

router.get("/api/teachers/:teacherId", async (req, res, next) => {
  const { teacherId } = req.params;
  try {
    const getTeacher = await Teacher.findById(teacherId);
    console.log(getTeacher);
    res.status(200).json(getTeacher);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

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
