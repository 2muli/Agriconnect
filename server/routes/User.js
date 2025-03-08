import express from 'express';
import { LoggedUserDetails, login, logout, register } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register); 
router.post("/login", login);
router.get("/loggeduser",LoggedUserDetails);
router.post("/logout",logout);
export default router;
