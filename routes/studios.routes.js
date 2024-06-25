const router = require("express").Router();
const Studios = require("../models/Studios.model");

router.post("/api/studios", async (req, res, next) => {
  try {
    const createStudio = await Studios.create(req.body);
    res.status(201).json(createStudio);
  } catch (error) {
    next(error);
  }
});

router.get("/api/studios/:studioId", async (req, res) => {
  const { studioId } = req.params;
  try {
    const foundStudio = await Studios.findById(studioId);
    if (foundStudio) {
      res.status(200).json({ message: "Studio found", foundStudio });
    } else {
      res.status(404).json({ errorMessage: "Studio not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Server error!" });
  }
});

router.get("/api/studios", async (req, res, next) => {
  try {
    const findAllStudios = await Studios.find();
    console.log(findAllStudios);
    res.status(200).json(findAllStudios);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
