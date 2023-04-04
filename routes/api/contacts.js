const express = require("express");
const Joi = require("joi");

const router = express.Router();
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" must be string`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is required`,
    "string.empty": `"phone" cannot be empty`,
    "string.base": `"phone" must be string`,
  }),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.getContactById(id);

    if (!contact) {
      throw HttpError(404, "Contact not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing fields");
    }
    const { id } = req.params;
    const updateContact = await contacts.updateContact(id, req.body);
    if (!updateContact) {
      throw HttpError(404, "Contact not found");
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteContact = await contacts.removeContact(id);
    if (!deleteContact) {
      throw HttpError(404, "Contact not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// const invokeAction = async ({ action, id, name, email, phone }) => {
//   switch (action) {
//     case "list":
//       const allContacts = await contacts.listContacts();
//       console.table(allContacts);
//       break;
//     case "get":
//       const contact = await contacts.getContactById(id);
//       console.table(contact);
//       break;

//     case "update":
//       const updateContact = await contacts.updateById(id, {
//         name,
//         email,
//         phone,
//       });
//       console.table(updateContact);
//       break;

//     case "add":
//       const newContact = await contacts.addContact({ name, email, phone });
//       console.table(newContact);
//       break;

//     case "remove":
//       const deleteContact = await contacts.removeContact(id);
//       console.table(deleteContact);
//       break;
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// };

// invokeAction({ action: "list" });
