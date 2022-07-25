const express = require("express");
const imgrouter = express.Router();
const fs = require("fs");

imgrouter.get("/img/:imagename", async (req, res) => {
  let imagename = req.params.imagename;
  let findimage = await fs.readFile(`../uploads/${imagename}`, () => {
    console.log("The image file is read");
  });
  await res.send(fileimage);
});

module.exports = imgrouter;
