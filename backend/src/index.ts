import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import routes from './routes';
import appDataSource from '../config/database';
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(routes);
//initialize connection and server
appDataSource.initialize()
.then(() => {
  console.log("Data Source has been initialized!")
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error("Error during Data Source initialization", error)
});


