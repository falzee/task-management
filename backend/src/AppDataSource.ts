import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "./entities/User";
import { Task } from "./entities/Task";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  synchronize: false,
  logging: true,

  entities: [User, Task],
  migrations: [__dirname + '/migration/**/*{.js,.ts}']

});
