const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const rootRouter = require("./root.router");

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
const PORT = 5000;
const MONGODB_URI =
  "mongodb+srv://dutheesh:<password>@cluster0.wl3q4dm.mongodb.net/ITP?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Use the root router
app.use("/api/v1", rootRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
