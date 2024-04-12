const he = require("he");

async function displayDataToHome(req, res) {
  try {
    const results = await fetch("http://127.0.0.1:3000/offers");
    if (!results.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await results.json();
    if (!data) {
      throw new Error("No data found");
    }

    const decodedData = data.map((item) => {
      const decodedItem = Object.entries(item).reduce((acc, [key, value]) => {
        acc[key] = typeof value === "string" ? he.decode(value) : value;
        return acc;
      }, {});

      return decodedItem;
    });

    res.render("layouts/index", {
      offers: decodedData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

module.exports = {
  displayDataToHome,
};
