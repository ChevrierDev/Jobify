const offersRoute = require("./routes/offers.route");
const http = require("http");
const app = require("./app");

require("dotenv").config();

const PORT = process.env.PORT;

const server = http.createServer(app);

app.use("/offers", offersRoute);

server.listen(PORT, () => {
  console.log(`You are listening to port ${PORT}...`);
});
