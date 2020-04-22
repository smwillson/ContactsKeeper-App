const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

//Bring in the models
const User = require("../models/Users");
const Contact = require("../models/Contact");

//@route   GET   api/contacts
//@desc    Get  all logged in user's contacts
//@access   Private

router.get("/", auth, async (req, res) => {
  //access the database

  try {
    //bring in a list of contacts - Order by desc
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//@route   POST   api/contacts
//@desc    Add a new contact
//@access   Private

router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //bad request: user error
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error!");
    }
  }
);

//@route   PUT  api/contacts/:id
//@desc    Update a contact
//@access   Private

router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //Build a contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized." });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true } //if a user isnt found, create a new one
    );

    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

//@route   DELETE   api/contacts/:id
//@desc    delete a contact
//@access   Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized." });
    }
    //Delete the contact
    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "contact removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
