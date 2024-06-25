const router = require("express").Router();
const UserModel = require("../models/Users.model");

router.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundUser = await UserModel.findById(id);

    if (foundUser) {
      res.status(200).json({ message: "User found", foundUser });
    } else {
      res.status(404).json({ errorMessage: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});

module.exports = router;
