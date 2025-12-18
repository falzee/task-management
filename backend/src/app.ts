import express from "express";
import { AppDataSource } from "./AppDataSource";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error", err);
  });
