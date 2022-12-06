const mongoose = require("mongoose");
const Joi = require("joi");
const ethereumDetailsSchema = new mongoose.Schema(
  {
    ethereumPrice: Number,
    currency: String,
  },
  {
    timestamps: true,
  }
);

const validateEthereumDetails = (data) => {
  const schema = Joi.object({
    ethereumPrice: Joi.number().label("Ethereum Price"),
    currency: Joi.string().label("Currency"),
  });
  return schema.validate(data);
};

const ethereumDetails = mongoose.model(
  "EthereumDetails",
  ethereumDetailsSchema
);
module.exports = { ethereumDetails, validateEthereumDetails };
