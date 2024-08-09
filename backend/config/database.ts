import { DataSource } from "typeorm"
import { Estimate } from '../src/models/Estimate';
import { Material } from '../src/models/Material';
import { User } from "../src/models/User";
require('dotenv').config();

//create new datasource for mysql
const appDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  synchronize: true,
  entities: [
    Estimate, Material, User
  ],
});

export default appDataSource
