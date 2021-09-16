const express = require("express");
const cors = require("cors");
const { routes } = require("./routes");
const app = express();
const corsOptions = {
    //   origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to diospierre application test." });
});

app.use("/api/", routes);

module.exports = app;
