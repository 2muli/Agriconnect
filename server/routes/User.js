import express from 'express';
import multer from "multer";
import path from "path";
import { changePassword, getFarmers, LoggedUserDetails, login, logout, register, resetPasswordWithToken, updateProfile, verifyToken } from '../controllers/userController.js';
const router = express.Router();
// ✅ Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(process.cwd(), "client/public/profile"); // ✅ Ensure this path exists
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
});

const upload = multer({ storage: storage }); // ✅ Initialize multer

router.post('/register', register); 
router.post("/login", login);
router.get("/loggeduser",LoggedUserDetails);
router.post("/logout",logout);
router.get('/getFarmer',verifyToken,getFarmers);
router.put('/changePassword',verifyToken,changePassword);
router.put("/reset-password/:token", resetPasswordWithToken);
router.put('/changeProfile/:id', verifyToken, upload.single("profile"), updateProfile);
export default router;
