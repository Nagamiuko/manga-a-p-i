import express from "express";
import {
         BookAll, deleteBook, getBookOneDetailAdmin
      } from "../controllers/BookController.js";
// import upload from "../middleware/Muter.js";
import { getChapterBookAllAdmin } from "../controllers/ChapterController.js";

const router = express.Router();

router.get("/book-all-admin",BookAll);
router.get("/book-detail-admin/:bookid",getBookOneDetailAdmin);
router.get("/book-chapter-all-admin/:bookid",getChapterBookAllAdmin);
router.delete("/book-delete/:bookid",deleteBook);

export default router