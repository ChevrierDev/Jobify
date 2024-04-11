const offersRoute = require("./routes/offers.route");
const http = require("http");
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT;

const server = http.createServer(app);


app.get('/home', (req, res) => {
  res.render('layouts/index')
})

app.use("/offers", offersRoute);

server.listen(PORT, () => {
  console.log(`You are listening to port ${PORT}...`);
});
