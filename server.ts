import app from "./app";

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
// Database connection
async function bootstrap() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
    console.log(`Mongodb connected to ${PORT}`);
  } catch (error) {
    console.log(`Connection error`);
  }
}
bootstrap();
