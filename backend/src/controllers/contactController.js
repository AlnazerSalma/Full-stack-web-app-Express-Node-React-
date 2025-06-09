const fs = require("fs");
const path = require("path");

const { sendNotFound, sendServerError, sendOk, sendCreated } = require("../utils/responses");
const contactsFilePath = path.join(__dirname, "../../data/contacts.json");

// CREATE contact
const createContact = (req, res) => {
  console.log("Received POST:", req.body);

  const { user_name, user_email, message } = req.body;

  if (!user_name || !user_email || !message)
    return sendNotFound(res, "All fields are required");

  const newContact = {
    id: Date.now(),
    user_name,
    user_email,
    message,
  };

  fs.readFile(contactsFilePath, "utf8", (readErr, data) => {
    let contacts = [];
    if (!readErr && data) {
      try {
        contacts = JSON.parse(data);
      } catch {
        console.warn("JSON parse error, resetting to empty array.");
      }
    }

    contacts.push(newContact);

    fs.writeFile(
      contactsFilePath,
      JSON.stringify(contacts, null, 2),
      (writeErr) => {
        if (writeErr) {
          console.error("Write error:", writeErr);
          return sendServerError(res, "Could not save contact");
        }

        console.log("Contact saved!");
          return sendCreated(res, { contact: newContact }, "Contact saved");
      }
    );
  });
};

//GET contacts
const getContacts = (req, res) => {
  fs.readFile(contactsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Read error:", err);
      return sendServerError(res, "Failed to read contacts");
    }

    try {
      const contacts = JSON.parse(data || "[]");
      return sendOk(res, { contacts });
    } catch (parseErr) {
      console.error("Parse error:", parseErr);
     return sendServerError(res, "Error parsing contacts");
    }
  });
};

module.exports = {
  createContact,
  getContacts,
};
