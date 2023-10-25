import express from "express";
import {verifyToken, verifyAdmin , verifyUser } from "../utils/verifyToken.js";
import {
  getUser,
  login,
  loginLine,
  registe,
  rePassword,
  updateUser,
  UserDelete,
  userUpdateCredit,
} from "../controllers/UserAuthController.js";
import uploadprofile from "../middleware/MuterUser.js";
const router = express.Router();

router.post("/register", registe);
router.post("/login", login);
router.post("/login-line", loginLine);
router.put("/user-updata-password/:id", rePassword);
router.delete("/user/delete/:userid", UserDelete);
router.put("/user/update-credit/:id", userUpdateCredit);
router.get("/user/:id", getUser);
router.put("/updata/:userid",uploadprofile.single("image"), updateUser);


export default router;
