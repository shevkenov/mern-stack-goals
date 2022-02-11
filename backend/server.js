const express = require("express");
const dotenv = require("dotenv").config();
const errorHandlerMiddleware = require("./middleware/errorHandler");

const routes = require("./routes/goalRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/goals", routes);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log('Server runs at port ' + port);
})