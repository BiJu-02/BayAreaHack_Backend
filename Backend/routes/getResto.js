const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

const apiList = require("../database/apiList");

router.get("/getResto", async (req, res) => {
    try {
        let promiseList = [];
        for (let i in apiList) {
            promiseList.push(fetch(`http://localhost:306${i}/getResto`));
        }
        const responses = await Promise.all(promiseList);
        promiseList.length = 0;
        for (let i in responses) {
            promiseList.push(responses[i].json());
        }
        const resp = await Promise.all(promiseList);
        let restoList = {};
        let cnt = 1;
        for (let i of resp) {
            if (Object.keys(i).length < 1) { cnt++; continue; }
            console.log(i);
            for (let j in i) {
                let temp = {
                    srvName: apiList[cnt],
                    delFee: i[j].delFee,
                    offer: i[j].offer,
                }
                if (restoList.hasOwnProperty(j)) {
                    restoList[j].delSrv.push(temp);
                } else {
                    restoList[j] = {
                        address: i[j].address,
                        delTime: i[j].delTime,
                        delSrv: [temp],
                    };
                }
            }
            cnt++;
        }
        
        console.log(restoList);
        res.send(restoList);
  
    } catch (err){
        console.log(err);
    }
});

module.exports = router;