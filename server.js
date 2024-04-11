const offersRoute = require("./routes/offers.route");
const homeRouter = require('./routes/home.route')
const http = require("http");
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT;

const server = http.createServer(app);

app.use('/home', homeRouter); 
app.use("/offers", offersRoute);

server.listen(PORT, () => {
  console.log(`You are listening to port ${PORT}...`);
});
