import express from 'express';
import {
    addNotification, deleteNotification,
    getMyNotifications, getMyNotificationsNumber, getNotificationByid,
    sentNotifications, updateNotification
} from '../controllers/notificationController.js';
import { verifyToken } from '../controllers/userController.js';

const router = express.Router();

router.post('/addNotification', verifyToken, addNotification);
router.get('/getMyNotifications/', verifyToken, getMyNotifications);
router.put('/updateNotification/:id', verifyToken, updateNotification);
router.get('/', verifyToken, sentNotifications);
router.delete('/deleteNotification/:id', verifyToken, deleteNotification);
router.get('/:id', verifyToken, getNotificationByid);
router.get('/getNumberOfNotification/:id', verifyToken, getMyNotificationsNumber);

export default router;
