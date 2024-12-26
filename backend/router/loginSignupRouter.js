import express from "express";

import { forgotPassword, Login, logout, resetPassword, Signup, VerifyOPT } from "../controller/authController.js";
import { GoogleAuth } from "../controller/OTPController.js";


const router  = express.Router();
router.post('/signup', Signup);
router.post('/login', Login);
router.get('/logout', logout);
router.post('/verify-email', VerifyOPT);
router.post('/googleLogin', GoogleAuth);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
