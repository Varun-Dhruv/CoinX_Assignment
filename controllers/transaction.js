const axios = require("axios");
const { validateTransaction, transactions } = require("../models/transaction");
const { fetchEthereumDetailsfromDB } = require("./ethereumPrice");

const getTransactions = async (req, res, next) => {
  try {
    if (req.params.address) var address = req.params.address;
    else var address = "0xce94e5621a5f7068253c42558c147480f38b5e0d";
    const result = await axios.get(
      "http://api.etherscan.io/api?module=account&action=txlist" +
        "&address=" +
        address +
        "&startblock=0" +
        "&endblock=99999999" +
        "&page=1" +
        "&offset=10" +
        "&sort=asc" +
        "&apikey=" +
        process.env.ETHERSCAN_API_KEY.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = result.data.result;
    const { error } = validateTransaction(data);
    if (error)
      return res.status(422).send({ message: "Invalid  format", error: error });
    await transactions.insertMany(data);
    // await transactions(data).save();
    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const getAccountBalance = async (req, res, next) => {
  try {
    const transactionsList = await transactions.find({});
    var balance = 0;
    transactionsList.map((transaction) => {
      if (transaction.from === req.params.address) {
        balance -= Number(transaction.value);
      } else if (transaction.to === req.params.address) {
        balance += Number(transaction.value);
      }
    });
    const ethereumValue = await fetchEthereumDetailsfromDB();
    return res
      .status(200)
      .send({ etherValue: balance, priceInINR: balance / ethereumValue });
  } catch (error) {
    console.error(error);
  }
};
module.exports = { getTransactions, getAccountBalance };
