import express from "express";
const router = express.Router();
import {createOrderProduct, getOrderOneBookAllShop, getOrderOneUser, getOrderShop, getOrderUser, getReceiptId} from '../controllers/orderController.js'
import {verifyToken, verifyAdmin , verifyUser } from "../utils/verifyToken.js";

router.post('/create-order',createOrderProduct)
router.get('/get-order-user/:userid',getOrderUser)
router.get('/get-order-one-user/:orderid',getOrderOneUser)
router.get('/get-order-all-shop/:shopid',getOrderShop)
router.get('/get-receipt/:receiptId',getReceiptId)

router.get('/get-order-book-all-shop/:bookid',getOrderOneBookAllShop)

export default router