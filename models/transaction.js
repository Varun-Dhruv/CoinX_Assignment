const mongoose = require("mongoose");
const Joi = require("joi");
const transactionSchema = mongoose.Schema({});

const validateTransaction = (data) => {
  const schema = Joi.object({});
  return schema.validate(data);
};

const transactions = mongoose.model("Transactions", transactionSchema);
module.exports = { transactions, validateTransaction };
