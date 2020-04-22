const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //bad request: user error
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      //check if a user has already been registered
      if (user) {
        return res
          .status(400)
          .json({ msg: "User already exists. Please use a different email." });
      } else {
        // for a new user
        user = new User({
          name,
          email,
          password,
        });

        //for encryption
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //save in the databae
        await user.save();

        //create payload for jwt
        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 3600000,
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error!");
    }
  }
);

module.exports = router;
