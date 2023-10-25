import express from "express";
const router = express.Router();
import { PaymentShop, stripeAPIKey } from "../controllers/Payments.js";


router.post('/payment/process',PaymentShop)
router.get('/stripeapikey',stripeAPIKey)

export default router