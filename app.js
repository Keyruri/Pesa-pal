// This is the entry point to the application

require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();


// helmet >> Sets various http headers to prevent attacks
// cors >>(cross origin resource origin) access our app from various domanins> allow or deny access 
// xss-clean >> sanitize req.body/query/params (user input) 
//limit the amuount of requests a user can make
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

app.get('/', (req,res)=>{
  res.send('Jobs App-backend')
})


// connectDB
const connectDB = require("./db/connect");
const authenticateUser = require('./middleware/authentication');

//Routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { register } = require("./controllers/auth");


app.set('trust proxy', 1); // for use in heroku
app.use(rateLimiter({
  windowMs:20 * 60 * 1000, // how long
  max: 100,  // Limit each IP requests per window

}));

app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())


// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs",authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



/* port application listening
If no available port is found the application listens to the port 3000 set

*/
const port = process.env.PORT || 3000;

/* 
The connection to the DB Must first be established before the application 
starts listening to the port set
*/
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
