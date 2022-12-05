const axios = require("axios");

const getEthereumPrice = async (req, res, next) => {
  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr"
    );
    const ethereumValueJson = JSON.parse(data.slice(3, 30));
    console.log(ethereumValueJson.ethereum.inr);
    res.status(200).send(ethereumValueJson);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = { getEthereumPrice };
