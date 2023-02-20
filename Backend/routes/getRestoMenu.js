const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

const apiList = require("../database/apiList");


router.get("/getRestoMenu", async (req, res) => {
    try {
        const rn = req.query.restoName;
        const promiseList = [];
        if (rn) {
            for (let i in apiList) {
                promiseList.push(fetch(`http://localhost:306${i}/getRestoMenu?restoName=${rn}`))
            }
            const responses = await Promise.all(promiseList);
            promiseList.length = 0;
            for (let i of responses) {
                promiseList.push(i.json());
            }
            const resp = await Promise.all(promiseList);
            let menuList = {};
            let cnt = 1;
            for (let i of resp) {
                if (Object.keys(i).length < 1) { cnt++; continue; }
                for (let j in i) {
                    if (menuList.hasOwnProperty(j)) {
                        menuList[j].push({price: i[j].price, delSrv: apiList[cnt]});
                    } else {
                        menuList[j] = [{price: i[j].price, delSrv: apiList[cnt]}];
                    }
                }
                cnt++;
            }
            console.log(menuList);
            res.send(menuList);
        } else {
            console.log("getRestoMenu: no query params");
            res.send({err: "did not receive name of food establishment (restoName) in url"});
        }
    } catch (err){
        console.log(err);
    }
});

module.exports = router;