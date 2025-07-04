import express from "express";
import dotenv from "dotenv";
import slackRoutes from "./routes/slackRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/slack", slackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
