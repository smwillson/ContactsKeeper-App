const express = require("express");
const router = express.Router();

//@route   GET   api/auth
//@desc    Get logged in user
//@access   Private

router.get("/", (req, res) => {
  res.send("get a logged user");
});

//@route   POST   api/auth
//@desc    Authenticate user and get token
//@access   Public

router.post("/", (req, res) => {
  res.send("login a user");
});

module.exports = router;
