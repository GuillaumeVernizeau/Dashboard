const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(
    `${process.env.TOKEN_MONGO_DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: " + error);
  });
