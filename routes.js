const express = require("express");
const router = express.Router();
const ContactModel = require("./models/contactModel.js");
const multiVcardParser = require("./helper");

router.get("/", (req, res) => {
  ContactModel.find()
    .sort({ first_name: 1, last_name: 1 })
    .exec((err, docs) => {
      if (err) {
        res.status(500).json({ message: err.message });
      }
      res.status(200).send(docs);
    });
});

router.get("/:id", (req, res) => {
  ContactModel.findById(req.params.id).exec((err, docs) => {
    if (err) {
      res.status(404).json({ message: err.message });
    }
    res.status(200).send(docs);
  });
});

router.post("/", (req, res) => {
  ContactModel.create(req.body, (err, doc) => {
    if (err) {
      res.status(422).json({ message: err.message });
    }
    res.status(201).send(doc);
  });
});

router.post("/import", async (req, res) => {
  const contact = multiVcardParser(req.body.vcard);
  // res.status(201).send(contact);

  ContactModel.create(contact, (err, doc) => {
    if (err) {
      res.status(422).json({ message: err.message });
    }
    res.status(201).send(doc);
  });
});

router.put("/:id", async (req, res) => {
  res.send(
    await ContactModel.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    })
  );
});

router.delete("/:id", async (req, res) => {
  ContactModel.findByIdAndDelete(req.params.id, () => res.sendStatus(204));
});

module.exports = router;
