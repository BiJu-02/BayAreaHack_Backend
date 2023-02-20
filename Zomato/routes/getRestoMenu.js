const express = require("express");
const router = express.Router();

const foodItem = require("../database/foodItem");
const resto = require("../database/resto");


router.get("/getRestoMenu", (req, res) => {
    try {
        const rn = req.query.restoName;
        if (req.query.restoName) {
            if (!resto[rn]) { res.send({}); }
            let restoMenu = {};
            for (let item of resto[rn].menu) {
                for (let rst of foodItem[item].restoList) {
                    if (rst.restoName == rn) {
                        restoMenu[item] = rst;
                    }
                }
            }
            console.log(restoMenu);
            res.send(restoMenu);
        } else {
            console.log("getRestoMenu: no query param");
            res.send("did not receive a name for food establishment");
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;