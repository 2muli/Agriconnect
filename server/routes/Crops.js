import express from 'express';
import {
    addProduce, deleteCrop, getCropByName,
    getCrops, getCropsByUser, updateCrop
} from '../controllers/cropController.js';
import { verifyToken } from '../controllers/userController.js';

const router = express.Router();

router.post('/addcrop', verifyToken, addProduce);
router.put('/updateCrop/:id', verifyToken, updateCrop);
router.delete('/deleteCrop/:id', verifyToken, deleteCrop);
router.get('/', getCrops);
router.get('/user/:user_id', getCropsByUser);
router.get('/crop/:crop_name', getCropByName); // Changed to avoid conflict

export default router;

