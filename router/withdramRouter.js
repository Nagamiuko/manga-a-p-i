import express from "express";
import {AdminCheckShopWihtdram, AdminUpdateStatusWihtdram, CreateWithdram ,DeleteWihtdram,DetailWihtdram,UserAllWihtdram} from "../controllers/withdram.js"
const router = express.Router();

router.post('/create-withdraw-request',CreateWithdram)
router.get('/withdram-all',AdminCheckShopWihtdram)
router.put('/withdram-update/:wid',AdminUpdateStatusWihtdram)
router.delete('/withdram-detele/:wid',DeleteWihtdram)
router.get('/withdram-detail/:wid',DetailWihtdram)
router.get('/user-all-withdram/:userid',UserAllWihtdram)


export default router;