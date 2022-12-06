const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const transactions = require("./routes/task1");
const account = require("./routes/task3");
const cron = require("node-cron");
const { getEthereumPrice } = require("./controllers/ethereumPrice");
dotenv.config(); // configuring environment variables
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: "*", // setting the cors allowance to everywhere
};

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions)); // enabling cors for the application

//API endpoints
app.use("/api/transactions", transactions);
app.use("/api/account", account);

app.listen(PORT, async () => {
  try {
    mongoose.connect(
      // Establisinh connection with MongoDB Atlas Database
      process.env.DATABASE_URL,
      {
        useNewUrlParser: true,
      },
      () => {
        console.log("Connected to db");
        console.log(`Server running at port ${PORT}`);
      }
    );
    cron.schedule("*/10 * * * *", () => {
      // scheduling task to fetch ethereum price every 10 min and storing it in the  database
      getEthereumPrice();
    });
  } catch (error) {
    console.error(error);
  }
});
