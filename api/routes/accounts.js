import express from 'express';
import { promises as fs} from 'fs';

const {readFile, writeFile} = fs;
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        //delete data.nextId;
        res.send(data.accounts);

        logger.info(`${req.method} ${req.baseUrl}`);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const account = data.accounts.find(account => account.id === parseInt(req.params.id))

        if (account != null) {
            res.send(account);
        } else {
            throw {"message": "Record not found!"};
        }

        logger.info(`${req.method} ${req.baseUrl} - ID: ${req.params.id}`);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let account = req.body;

        if (!account.name || account.balance == null) {
            throw new Error("Name and Balance are required!");
        }

        const data = JSON.parse(await readFile(global.fileName));

        account = { id: data.nextId++, ...account };
        data.accounts.push(account);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        
        res.send(account);

        logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const account = req.body;

        if (!account.id || !account.name || account.balance == null) {
            throw new Error("Id, Name and Balance are required!");
        }

        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex(a => a.id === account.id)

        if (index === -1) {
            throw new Error("Record not found!");
        }

        data.accounts[index].name = account.name;
        data.accounts[index].balance = account.balance;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(account);

        logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
});

router.patch('/updateBalance', async (req, res, next) => {
    try {
        const account = req.body;

        if (!account.id || account.balance == null) {
            throw new Error("Id and Balance are required!");
        }

        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex(a => a.id === account.id)

        if (index === -1) {
            throw new Error("Record not found!");
        }

        data.accounts[index].balance = account.balance;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(account);

        logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id))

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.end();
    } catch (error) {
        next(error);
    }
});

router.use((error, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
    console.log(error);
    res.status(400).send({ error: error.message });
});

export default router;