const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// GET all contacts
router.get("/", async(req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new contact
router.post("/", async(req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ message: "Name, email, and phone are required." });
    }

    try {
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;