import express from 'express'
import {registerUser,loginUser,getUserProfile,updateUser} from '../controllers/userControllers.js'
import {verifyToken} from '../middleware/auth.js'
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',verifyToken,getUserProfile);
router.put('/profile',verifyToken,updateUser);




export default router;