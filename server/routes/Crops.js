import express from 'express';
import {
    addProduce, deleteCrop,
    getAllCropNumber,
    getCropByid,
    getCrops, getCropsByUser, getMyCropNumber, getMyCrops, updateCrop
} from '../controllers/cropController.js';
import { verifyToken } from '../controllers/userController.js';

const router = express.Router();

router.post('/addcrop', verifyToken, addProduce);
router.put('/updateCrop/:id', verifyToken, updateCrop);
router.delete('/deleteCrop/:id', verifyToken, deleteCrop);
router.get('/', getCrops);
router.get('/getMyCropNumber/:id',verifyToken,getMyCropNumber);
router.get('/getCropsNumber',verifyToken,getAllCropNumber)
router.get('/mycrops',verifyToken,getMyCrops);
router.get('/user/:user_id', getCropsByUser);
router.get('/crop/:id', getCropByid); // Changed to avoid conflict

export default router;

