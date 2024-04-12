async function displayDataToHome(req, res) {
  try {
    const results = await fetch("http://127.0.0.1:3000/offers");
    const data = await results.json();

    if (!data) {
      throw new Error("No Data found");
    }

    res.render("layouts/index", {
      offers: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal servor error !");
  }
}

module.exports = {
  displayDataToHome,
};
