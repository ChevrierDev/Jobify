const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", async (req, res) => {
  const results = await fetch("http://127.0.0.1:3000/offers");
  const data = await results.json();
  console.log("Data:", data);
  console.log("Type of data:", typeof data);

  res.render("layouts/index", {
    offers: data,
  });
});

module.exports = homeRouter;