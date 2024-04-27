if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const offersRoute = require("./routes/offers/offers.route");
const homeRouter = require('./routes/home/home.route');
const offerRoute = require('./routes/offers/offer.route');
const authRoute = require('./routes/auth/auth.route');
const recruterRoute = require('./routes/recruter/recruter.route');
const usersRoute = require('./routes/users/users.route');
const unauthorizedRoute = require('./routes/auth/unauthorized.route');

const http = require("http");


const { app } = require("./app");

const PORT = process.env.PORT;

const server = http.createServer(app);

app.use('/home', homeRouter); 
app.use("/offers", offersRoute);
app.use("/offer", offerRoute);
app.use("/login", authRoute);
app.use("/recruter", recruterRoute);
app.use('/users', usersRoute);
app.use('/unauthorized', unauthorizedRoute)

server.listen(PORT, () => {
  console.log(`You are listening to port ${PORT}...`);
});
