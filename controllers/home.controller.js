const he = require("he");

//fetch data and decode ot en display it
async function displayDataToHome(req, res) {
  try {
    const results = await fetch("http://127.0.0.1:3000/offers");
    const data = await results.json();

    const decodedData = Array.isArray(data)
      ? data.map((item) => {
          const decodedItem = Object.entries(item).reduce(
            (acc, [key, value]) => {
              // Remplacer H&#x2F;F par H/F
              if (typeof value === "string") {
                value = value.replace('_', ' ');
              }
              // Décoder la valeur
              acc[key] = typeof value === "string" ? he.decode(value) : value;
              return acc;
            },
            {}
          );

          return decodedItem;
        })
      : [];

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
