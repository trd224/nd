const express = require("express");
const app = express();
const mongoDbConnection = require("./connection");
const path = require("path");
const cookieParser = require("cookie-parser");

PORT = 4000;

//mongodb connection
mongoDbConnection("mongodb://127.0.0.1:27017/nd")
.then(() => console.log("mongodb connected"))
.catch(err => console.log("Error", err));

//views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


//static Route
app.use("/", require("./routes/staticRoute"));

//api Route
app.use("/api/user", require("./routes/user"));
app.use("/api/url", require("./routes/url"));


app.listen(PORT, () => console.log(`server running on port ${PORT}`));