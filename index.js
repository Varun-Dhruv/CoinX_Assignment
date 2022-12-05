const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config(); // configuring environment variables
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: "*", // setting the cors allowance to everywhere
};

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions)); // enabling cors for the application

app.listen(PORT, async () => {
  try {
    await mongoose.connect(
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
  } catch (error) {
    console.error(error);
  }
});
