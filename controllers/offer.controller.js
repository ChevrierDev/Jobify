const db = require("../config/db");
const he = require("he");

//decode function
function decodeData(item) {
  const decodedItem = Object.entries(item).reduce((acc, [key, value]) => {
    if (typeof value === "string") {
      value = value.replace("_", " ");
    }
    acc[key] = typeof value === "string" ? he.decode(value) : value;
    return acc;
  }, {});
  return decodedItem;
}

async function fetchofferData(req, res) {
  try {
    const offerId = req.params.id;
    const results = await fetch(`http://127.0.0.1:3000/offers/${offerId}`);
    const data = await results.json();

    ;
    console.log(decodeData(data));

    res.status(200).render("layouts/offer", {
      offer: decodeData(data),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error!");
  }
}

module.exports = fetchofferData;
