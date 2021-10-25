import { promises as fs} from 'fs';
import AccountService from '../services/account.service.js';

const { readFile, writeFile } = fs;

async function getAccounts(req, res, next) {
    try {
        res.send(await AccountService.getAccounts());
        logger.info(`${req.method} ${req.baseUrl}`);
    } catch (error) {
        next(error);
    }
}

async function getAccount(req, res, next) {
    try {
        let account = await AccountService.getAccount(req.params.id);

        if (account != null) {
            res.send(account);
        } else {
            throw {"message": "Record not found!"};
        }

        logger.info(`${req.method} ${req.baseUrl} - ID: ${req.params.id}`);
    } catch (error) {
        next(error);
    }
}

async function createAccount(req, res, next) {
    try {
        let account = req.body;

        if (!account.name || account.balance == null) {
            throw new Error("Name and Balance are required!");
        }

        account = await AccountService.createAccount(account);

        res.send(account);

        logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
}

async function updateAccount(req, res, next) {
    try {
        let account = req.body;

        if (!account.id || !account.name || account.balance == null) {
            throw new Error("Id, Name and Balance are required!");
        }

        account = await AccountService.updateAccount(account);

        res.send(account);

        logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
}

async function updateBalanceAccount(req, res, next) {
    try {
        const account = req.body;

        if (!account.id || account.balance == null) {
            throw new Error("Id and Balance are required!");
        }

        res.send(await AccountService.updateBalanceAccount(account));

        logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
}

async function deleteAccount(req, res, next) {
    try {
        res.end(await AccountService.deleteAccount(req.params.id));
    } catch (error) {
        next(error);
    }
}

export default {
    getAccount,
    getAccounts,
    createAccount,
    updateAccount,
    updateBalanceAccount,
    deleteAccount,
}