const express = require("express");
const router = express.Router();

//@route   GET   api/contacts
//@desc    Get  all logged in user's contacts
//@access   Private

router.get("/", (req, res) => {
  res.send("get a logged user contacts");
});

//@route   POST   api/contacts
//@desc    Add a new contact
//@access   Private

router.post("/", (req, res) => {
  res.send("add a contact");
});

//@route   PUT  api/contacts/:id
//@desc    Update a contact
//@access   Private

router.put("/:id", (req, res) => {
  res.send("update a contact");
});

//@route   DELETE   api/contacts/:id
//@desc    delete a contact
//@access   Private

router.delete("/:id", (req, res) => {
  res.send("delete a contact");
});

module.exports = router;
