const express = require("express");
const cors = require("cors")
const getRestoMenu = require("./routes/getRestoMenu");
const getResto = require("./routes/getResto");
const getFood = require("./routes/getFood");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.get("/", (req, res) => { res.send("node app is running"); });
app.use("/", getRestoMenu);
app.use("/", getResto);
app.use("/", getFood);


app.listen(3050, (err) => {
    if (err) { console.log(err) }
    else { console.log("server running on port 3050"); }
});