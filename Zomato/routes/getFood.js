const express = require("express");

const router = express.Router();

const foodItem = require("../database/foodItem");


router.get("/getFood", async (req, res) => {
    try {
        let food = req.query.foodName
        if (food) {
            let restoList = [];
            for (let item in foodItem) {
                if (item.includes(food)) {
                    for (let x of foodItem[item].restoList) {
                        restoList.push({restoName: x.restoName, itemName: item, price: x.price});
                    }
                }
            }
            res.send(restoList);
        } else {
            console.log("getFood: no query param");
            res.send("did not receive food name");
        }
    } catch {
        console.log("ded");
    }
});

module.exports = router;