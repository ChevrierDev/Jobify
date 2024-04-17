const offersRoute = require("./routes/offers.route");
const homeRouter = require('./routes/home.route');
const offerRoute = require('./routes/offer.route');
const authRoute = require('./routes/auth.route');
const recruterRoute = require('./routes/recruter.route');

const http = require("http");
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT;

const server = http.createServer(app);

app.use('/home', homeRouter); 
app.use("/offers", offersRoute);
app.use("/offer", offerRoute);
app.use("/login", authRoute);
app.use("/recruter", recruterRoute);

server.listen(PORT, () => {
  console.log(`You are listening to port ${PORT}...`);
});
