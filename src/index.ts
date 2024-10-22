import dotenv from 'dotenv';
import app from './app';
import { SERVER } from './config/server';
// import MongoService from './services/databaseServices/mongo.services';

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

async function startServer() {
  // const mongoDB = MongoService.getInstance();
  try {
    // await mongoDB.connect();
    app.listen(SERVER.PORT, () => {
      console.log(`CompeteAE Server is running at port: ${SERVER.PORT}`);
    });
  } catch (error) {
    console.error('Error starting server: ', error);
    // await mongoDB.disconnect();
    process.exit(1);
  }
}

startServer();