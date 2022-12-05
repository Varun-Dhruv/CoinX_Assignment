const express = require("express");
const { getTransactions } = require("../controllers/transaction");
const router = express.Router();

router.get("/:address", getTransactions);
module.exports = router;
