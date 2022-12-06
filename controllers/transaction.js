const axios = require("axios");
const { validateTransaction, transactions } = require("../models/transaction");
const { fetchEthereumDetailsfromDB } = require("./ethereumPrice");

const getTransactions = async (req, res, next) => {
  try {
    if (req.params.address) var address = req.params.address; // if the user provides a address use that account address to fetch details
    else var address = "0xce94e5621a5f7068253c42558c147480f38b5e0d";
    // API call to ether scan to fetch the list of normal transactions for given account address.
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
    const data = result.data.result;  //extract the data from result
    const { error } = validateTransaction(data);  //validate the schema of Transaction using Joi
    if (error)
      return res.status(422).send({ message: "Invalid  format", error: error }); // if the schema is invalid through an 422 Exception

    await transactions.insertMany(data);  // Insert into database the list of transactions
    // await transactions(data).save();
    return res.status(200).send(data);  // return the list of transactions to the user.
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const getAccountBalance = async (req, res, next) => {
  try {
    const transactionsList = await transactions.find({}); // fetching a list of all transactions from the database
    var balance = 0; // initial balance
    transactionsList.map((transaction) => {  // traversing through the transaction list array 
      if (transaction.from === req.params.address) { // if the transaction is carried by the user then deduct the value of transaction from account
        balance -= Number(transaction.value);
      } else if (transaction.to === req.params.address) {  // if the transaction is to the users account  add the value of transaction to his balance 
        balance += Number(transaction.value);
      }
    });
    const ethereumValue = await fetchEthereumDetailsfromDB(); // get the current value of ethereum from database
    return res
      .status(200)
      .send({ etherValue: balance, priceInINR: balance / ethereumValue ,currentPriceofEthereum:ethereumValue});  // returning the required data
  } catch (error) {
    console.error(error);
  }
};
module.exports = { getTransactions, getAccountBalance };
