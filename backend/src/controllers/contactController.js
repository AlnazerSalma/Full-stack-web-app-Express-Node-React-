const fs = require("fs");
const path = require("path");

const contactsFilePath = path.join(__dirname, "../../data/contacts.json");

// CREATE contact
const createContact = (req, res) => {
  console.log("Received POST:", req.body);

  const { user_name, user_email, message } = req.body;

  if (!user_name || !user_email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

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
          return res.status(500).json({ error: "Could not save contact" });
        }

        console.log("Contact saved!");
        return res
          .status(201)
          .json({ message: "Contact saved", contact: newContact });
      }
    );
  });
};

//GET contacts
const getContacts = (req, res) => {
  fs.readFile(contactsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Read error:", err);
      return res.status(500).json({ error: "Failed to read contacts" });
    }

    try {
      const contacts = JSON.parse(data || "[]");
      res.status(200).json(contacts);
    } catch (parseErr) {
      console.error("Parse error:", parseErr);
      res.status(500).json({ error: "Error parsing contacts" });
    }
  });
};

module.exports = {
  createContact,
  getContacts,
};
