require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/transactions", transactionRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`we here at ${process.env.PORT}`);
      console.log("connected");
    });
  })
  .catch((e) => {
    console.error("MongoDB connection error:", e.message);
    process.exit(1);
  });
