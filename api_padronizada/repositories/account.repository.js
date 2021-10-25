import { promises as fs} from 'fs';

const { readFile, writeFile } = fs;

async function getAccounts() {
    const data = JSON.parse(await readFile(global.fileName));
    return data.accounts;
}

async function getAccount(id) {
    const accounts = await getAccounts();
    const account = accounts.find(account => account.id === parseInt(id))

    if (account) {
        return account;
    }

    throw new Error('Record not found!');
}

async function createAccount(account) {
    const data = JSON.parse(await readFile(global.fileName));

    account = { 
        id: data.nextId++,
        name: account.name,
        balance: account.balance,
    };

    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return account;
}

async function updateAccount(account) {
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(a => a.id === account.id)

    if (index === -1) {
        throw new Error("Record not found!");
    }

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return data.accounts[index];
}

async function deleteAccount(id) {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(account => account.id !== parseInt(id))

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

export default {
    getAccounts,
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount,
}