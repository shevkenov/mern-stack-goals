const express = require("express");
const dotenv = require("dotenv").config();

const mongoDB = require("./config/db");
const errorHandlerMiddleware = require("./middleware/errorHandler");

const routes = require("./routes/goalRoutes");

const app = express();
const port = process.env.PORT || 5000;
mongoDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/goals", routes);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log('Server runs at port ' + port);
})