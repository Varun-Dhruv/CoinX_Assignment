const axios = require("axios");

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
    res.status(200).send(result.data.result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = { getTransactions };
