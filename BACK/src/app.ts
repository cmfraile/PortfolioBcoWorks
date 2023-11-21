import { configDotenv } from 'dotenv';
import Server from './models/Server';

//console.clear();
configDotenv({path:'./src/.env'}) ; const server = new Server() ; server.listen();
