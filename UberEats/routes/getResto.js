const express = require("express");

const router = express.Router();

const resto = require("../database/resto");

router.get("/getResto", async (req, res) => {
    try {
        res.send(resto);
    } catch {
        console.log("ded");
    }
});

module.exports = router;