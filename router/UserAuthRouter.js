import express from "express";
import {verifyToken, verifyAdmin , verifyUser } from "../utils/verifyToken.js";
import {
  activateUser,
  getUser,
  login,
  loginLine,
  registe,
  rePassword,
  updateUser,
  updateUserImage,
  UserDelete,
  userUpdateCredit,
} from "../controllers/UserAuthController.js";
import upload from "../plugins/Muter.js";
const router = express.Router();

router.post("/register", registe);
router.get("/activateUser", activateUser);
router.post("/login", login);
router.post("/login-line", loginLine);
router.put("/user-updata-password/:id", rePassword);
router.delete("/user/delete/:userid", UserDelete);
router.put("/user/update-credit/:id", userUpdateCredit);
router.get("/user", getUser);
router.put("/updata/:userId", updateUser);
router.put("/updata/image/:userId",upload.single("image"), updateUserImage);


export default router;
