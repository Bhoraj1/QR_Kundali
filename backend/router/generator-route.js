import express from "express";
import { GenerateQr, ScanQr } from "../controller/qrController.js";
import { protect } from "../controller/authController.js";

const router2 = express.Router();
router2.post("/generate-qr", protect, GenerateQr);
router2.post("/save-scan", ScanQr);

export default router2;
