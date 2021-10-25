import express from 'express';
import AccountController from '../controllers/account.controller.js';

const router = express.Router();

router.get('/', AccountController.getAccounts);
router.get('/:id', AccountController.getAccount);
router.post('/', AccountController.createAccount);
router.put('/',  AccountController.updateAccount);
router.patch('/updateBalance', AccountController.updateBalanceAccount);
router.delete('/:id', AccountController.deleteAccount);

router.use((error, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
    console.log(error);
    res.status(400).send({ error: error.message });
});

export default router;