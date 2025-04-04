import express from "express";
import {
  createBook,
  getBookall,
  getBookAllUser,
  getBookOneDetail,
  getNovelallCompose,
  getNovelallTranslate,
  getNovelall,
  getBookAll,
  deleteBook,
  updataBook,
  BookAll,
  addWishBookToMe,
  getWishBookToMe,
  removeWishBookToMe,
} from "../controllers/BookController.js";
import upload from "../plugins/Muter.js";

const router = express.Router();
router.post("/create-books/:userid", upload.single("imagecover"), createBook);
router.post("/all-book", getBookall);
router.post("/all-books", getBookAll);
router.post("/all-novel-compose", getNovelallCompose);
router.post("/all-novel-translate", getNovelallTranslate);
router.post("/all-novel", getNovelall);
router.post("/all-book-user/:userid", getBookAllUser);
router.post("/book-detail/:bookid", getBookOneDetail);
// router.post("/book-detail",getBookOneDetail);
router.put("/updata-book/:bookid", upload.single("imagecover"), updataBook);
router.delete("/delete/book/:bookid", deleteBook);
router.get("/", BookAll);
router.post("/add/watchbook/:userid/book/:bookid", addWishBookToMe);
router.get("/watchbook/:userid", getWishBookToMe);
router.delete(
  "/remove/watchbook/user/:userid/watch/:watchid",
  removeWishBookToMe
);

export default router;
