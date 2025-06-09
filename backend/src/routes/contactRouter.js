const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  getContactByField,
} = require("../controllers/contactController");
router.post("/", createContact);
router.get("/", getContacts);
router.get("/filter", getContactByField);

module.exports = router;