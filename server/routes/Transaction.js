import express from 'express';
import { addTransaction, deleteTransaction, getAllTransactions, getBuyerTransaction, getTransactionById, updateTransaction } from '../controllers/transactionControler.js';
import { verifyToken } from '../controllers/userController.js';

const router=express.Router()

router.get('/', verifyToken, getAllTransactions);
router.post('/', verifyToken, addTransaction);
router.get('/myTransactions', verifyToken, getBuyerTransaction);
router.get('/:id', verifyToken, getTransactionById);
router.put('/:id', verifyToken, updateTransaction);
router.delete('/:id', verifyToken, deleteTransaction);

export default router