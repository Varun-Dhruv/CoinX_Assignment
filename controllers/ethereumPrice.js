const axios = require("axios");
const { ethereumDetails } = require("../models/ethereumPrice");

const getEthereumPrice = async () => {
  try {
    const { data } = await axios.get(
      // Fetching the current Ethereum price from the given endpoint
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr"
    );
    const ethereumValueJson = JSON.parse(data.slice(3, 30)); // cleaning the result obtained to remove redundant symbols and converting into JSON object
    await new ethereumDetails({
      ethereumPrice: ethereumValueJson.ethereum.inr,
      currency: "inr",
    }).save(); // saving the current price of ethereum into the database.
  } catch (error) {
    console.error(error);
    // res.status(500).send({ message: "Internal Server Error" });
  }
};
const fetchEthereumDetailsfromDB = async () => {
  try {
    const data = await ethereumDetails.find().sort({ _id: -1 }).limit(1); //fetching the latest price of ethereum from database.
    
    if (data) return data[0].ethereumPrice;
  } catch (error) {
    console.error(error);
  }
};
module.exports = { getEthereumPrice, fetchEthereumDetailsfromDB };
