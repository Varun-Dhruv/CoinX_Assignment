const mongoose = require("mongoose");
const Joi = require("joi");
const transactionSchema = mongoose.Schema({
  blockNumber: String,
  timeStamp: String,
  hash: String,
  nonce: String,
  blockHash: String,
  transactionIndex: String,
  from: String,
  to: String,
  value: String,
  gas: String,
  gasPrice: String,
  isError: String,
  txreceipt_status: String,
  input: String,
  contractAddress: String,
  cumulativeGasUsed: String,
  gasUsed: String,
  confirmations: String,
  methodId: String,
  functionName: String,
});

const validateTransaction = (data) => {
  const schema = Joi.array()
    .items({
      blockNumber: Joi.string().label("blockNumber"),
      timeStamp: Joi.string().label("timeStamp"),
      hash: Joi.string().label("hash"),
      nonce: Joi.string().label("nonce"),
      blockHash: Joi.string().label("blockHash"),
      transactionIndex: Joi.string().label("transactionIndex"),
      from: Joi.string().label("fromAddress"),
      to: Joi.string().label("toAddress"),
      value: Joi.string().label("value"),
      gas: Joi.string().label("gas"),
      gasPrice: Joi.string().label("gasPrice"),
      isError: Joi.string().label("isError"),
      txreceipt_status: Joi.string().label("txreceipt_status"),
      input: Joi.string().label("input"),
      contractAddress: Joi.string()
        .allow(null)
        .allow("")
        .optional()
        .label("contractAddress"),
      cumulativeGasUsed: Joi.string().label("cumulativeGasUsed"),
      gasUsed: Joi.string().label("gasUsed"),
      confirmations: Joi.string().label("confirmations"),
      methodId: Joi.string().label("methodId"),
      functionName: Joi.string()
        .allow(null)
        .allow("")
        .optional()
        .label("functionName"),
    })
    .label("array");
  return schema.validate(data);
};

const transactions = mongoose.model("Transactions", transactionSchema);
module.exports = { transactions, validateTransaction };
