import express from "express";
import winston from "winston";
import cors from "cors";
import accountRouter from "./routes/accounts.js";
import {promises as fs} from "fs";

const { readFile, writeFile } = fs;
const { combine, timestamp, label, printf } = winston.format;
const app = express();
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.fileName = 'accounts.json';
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'logs/my-bank-api.log'}),
    ],
    format: combine(
        label({ label: 'my-bank-api' }),
        timestamp(),
        myFormat
    )
});

app.use(cors());
app.use(express.json());
//app.use(express.static('public'));
app.use("/account", accountRouter);

app.listen(8888, async () => {
    try {
        await readFile(global.fileName); 
        logger.info('API Started!');
    } catch (error) {
        const initialJson = {
            nextId: 1,
            accounts: [],
        };

        writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
            logger.info('API Started and File Created!');
        }).catch(error => {
            logger.error(error);
        });
    }
});