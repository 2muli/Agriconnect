import express from 'express';
import {
    addOrder, approveOrder, deleteOrder, getAcceptedOrders,
    getAllOrders, getAllUnpendingOrders, getMyOrdersNumber, getPendingOrders, getRejectedOrders, rejectOrder, updateOrder
} from '../controllers/orderController.js';
import { verifyToken } from '../controllers/userController.js';

const router=express.Router();
router.get('/',verifyToken,getAllUnpendingOrders)
 router.get('/getAllOrders',verifyToken,getAllOrders);
 router.post('/addOrder',verifyToken,addOrder);
 router.delete('/deleteOrder/:id',verifyToken,deleteOrder)
 router.put('/updateOrder/:id',verifyToken,updateOrder);
 router.put('/rejectOrder/:id',verifyToken,rejectOrder);
 router.put('/acceptOrder/:id',verifyToken,approveOrder);
 router.get('/getAcceptedOrders',verifyToken,getAcceptedOrders);
 router.get('/getRejectedOrders',verifyToken,getRejectedOrders);
 router.get('/getPendingOrder',verifyToken,getPendingOrders);
 router.get('/getMyOrdersNumber/:id',verifyToken,getMyOrdersNumber)


 export default router;