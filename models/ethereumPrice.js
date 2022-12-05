const mongoose = require("mongoose");
const Joi = require("joi");
const ethereumDetailsSchema = mongoose.Schema({});

const validateEthereumDetails = (data) => {
  const schema = Joi.object({});
  return schema.validate(data);
};

const ethereumDetails = mongoose.model(
  "EthereumDetails",
  ethereumDetailsSchema
);
module.exports = { ethereumDetails, validateEthereumDetails };
