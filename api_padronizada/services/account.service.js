import AccountRepository from "../repositories/account.repository.js";

async function getAccounts() {
    return await AccountRepository.getAccounts(); 
}

async function getAccount(id) {
    return await AccountRepository.getAccount(id); 
}

async function createAccount(account) {
    return await AccountRepository.createAccount(account); 
}

async function updateAccount(account) {
    return await AccountRepository.updateAccount(account); 
}

async function updateBalanceAccount(account) {
    const acc = await AccountRepository.getAccount(account.id);
    acc.balance = account.balance;

    return await AccountRepository.updateAccount(acc); 
}

async function deleteAccount(id) {
    return await AccountRepository.deleteAccount(id); 
}

export default {
    getAccounts,
    getAccount,
    createAccount,
    updateAccount,
    updateBalanceAccount,
    deleteAccount,
}