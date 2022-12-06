const express = require("express");
const { getAccountBalance } = require("../controllers/transaction");
const router = express.Router();

router.get("/balance/:address", getAccountBalance);
module.exports = router;
