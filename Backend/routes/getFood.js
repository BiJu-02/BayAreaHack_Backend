const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

const apiList = require("../database/apiList");

router.get("/getFood", async (req, res) => {
    try {
        let fnam = req.query.foodName;
        if (fnam) {
            let promiseList = [];
            for (let i in apiList) {
                promiseList.push(fetch(`http://localhost:306${i}/getFood?foodName=${fnam}`));
            }
            const responses = await Promise.all(promiseList);
            promiseList.length = 0;
            for (let i in responses) {
                promiseList.push(responses[i].json());
            }
            const resp = await Promise.all(promiseList);    // resp is an array here
            let foodList = {};
            let cnt = 1;
            for (let i of resp) {
                for (let j of i) {
                    if (foodList.hasOwnProperty(j.restoName)) {
                        if (foodList[j.restoName].hasOwnProperty(j.itemName)) {
                            foodList[j.restoName][j.itemName].push({price: j.price, delSrv: apiList[cnt]});
                        } else {
                            foodList[j.restoName][j.itemName] = [{price: j.price, delSrv: apiList[cnt]}]
                        }
                    } else {
                        foodList[j.restoName] = {[j.itemName]: [{price: j.price, delSrv: apiList[cnt]}]};
                    }
                }
                cnt++;
            }
            console.log(foodList);
            res.send(foodList);
        } else {
            console.log("getFood: no query param");
            res.send({err: "did not receive food item name (foodName) in url"})
        }
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;