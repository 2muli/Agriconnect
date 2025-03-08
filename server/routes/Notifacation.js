import express from 'express';
import {
    addNotification, deleteNotification,
    getMyNotifications, sentNotifications, updateNotification
} from '../controllers/notificationController.js';
import { verifyToken } from '../controllers/userController.js';

const router=express.Router();

router.post('/addNotification',verifyToken,addNotification);
router.get('/getMyNotifications',verifyToken,getMyNotifications);
router.put('/updateNotification/:id',verifyToken,updateNotification);
router.get('/',verifyToken,sentNotifications);
router.delete('/deleteNotification/:id',verifyToken,deleteNotification);

export default router;