import express from "express";
import {verifyToken, verifyAdmin , isAuthenticated, verifyUser } from "../utils/verifyToken.js";
import {UpdateWithDramUser, UserAll ,UserOne, getUserOne} from '../controllers/User.js'
import {getBookAllUsers } from "../controllers/BookController.js";
const router = express.Router();


router.get("/",UserAll);
router.get("/:userid",UserOne);
router.get("/book-all/:userid",getBookAllUsers);
router.get("/user",verifyUser,getUserOne);
router.put("/user-update-withdram/:id",UpdateWithDramUser);

export default router