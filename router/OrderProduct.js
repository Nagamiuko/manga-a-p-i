import express from "express";
const router = express.Router();
import {createCartItem, createOrderProduct, getCartItem, getOrderOneBookAllShop, getOrderOneUser, getOrderShop, getOrderUser, getReceiptId} from '../controllers/orderController.js'
import {verifyToken, verifyAdmin , verifyUser } from "../utils/verifyToken.js";

router.post('/create-order',createOrderProduct)
router.post('/create-cart/add/product/:bookid/user/:userid',createCartItem)
router.get('/cart/items/user/:userid',getCartItem)
router.get('/get-order-user/:userid',getOrderUser)
router.get('/get-order-one-user/:orderid',getOrderOneUser)
router.get('/get-order-all-shop/:shopid',getOrderShop)
router.get('/get-receipt/:receiptId',getReceiptId)
router.get('/get-order-book-all-shop/:bookid',getOrderOneBookAllShop)

export default router