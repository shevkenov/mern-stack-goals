const express = require("express");
const dotenv = require("dotenv").config();

const mongoDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");

const goalsRoutes = require("./routes/goalRoutes");
const usersRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 5000;
mongoDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/goals", goalsRoutes);
app.use("/api/users", usersRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server runs at port ' + port);
})