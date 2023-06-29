import dotenv from 'dotenv'
import __dirname from '../utils.js'
import { Command } from 'commander';
import { developmentLogger, productionLogger } from './logggers/logger.js';




const program = new Command();

dotenv.config()

program
  .option('--mode <mode>', 'Modo de trabajo', 'dev')
  .parse(process.argv);

const environment = program.opts().mode;

dotenv.config({
    path: environment === "prod" ? "./src/config/.env.prod" : "./src/config/.env.dev"
});

console.log(`Trabajando en entorno '${environment}'`);

const logger = environment === "prod" ? productionLogger : developmentLogger;




export default  {
  logger,
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    email: process.env.EMAIL,
    pass : process.env.PASS,
    passAdmin : process.env.ADMINPASS
}