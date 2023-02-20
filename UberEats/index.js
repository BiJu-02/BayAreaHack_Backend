const express = require("express");

const getRestoMenu = require("./routes/getRestoMenu");
const getResto = require("./routes/getResto");
const getFood = require("./routes/getFood");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => { res.send("zomato api"); });
app.use("/", getRestoMenu);
app.use("/", getResto);
app.use("/", getFood);

app.listen(3063, (err) => {
    if (err) { console.log(err) }
    else { console.log("zomato server running on port 3063"); }
});