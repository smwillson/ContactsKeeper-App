const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../models/Users");

//@route   POST   api/users
//@desc    register a user
//@access   Public

router.post(
  "/",
  [
    // user must have a name
    check("name", "Please add a name").not().isEmpty(),
    // username must be an email
    check("email", "Please include a valid email").isEmail(),
    // password must be at least 6 chars long
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //bad request: user error
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("passed");
  }
);

module.exports = router;
