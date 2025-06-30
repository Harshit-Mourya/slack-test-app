require("dotenv").config();
const express = require("express");
const app = express();
const slackRoutes = require("./slackRoutes");

app.use(express.json());

app.use("/slack", slackRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
