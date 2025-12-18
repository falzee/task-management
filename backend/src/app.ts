import express from "express";
import cors from "cors";
import { AppDataSource } from "./AppDataSource";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

const PORT = process.env.PORT || 3000;

const app = express();
// app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health-check", (req, res) => {
  res.send("API running");
});

app.use("/v1/auth", authRoutes);
app.use("/v1/tasks", taskRoutes);

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
