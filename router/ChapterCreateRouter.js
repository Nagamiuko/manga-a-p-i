import express from "express";
import {
  createChapter,
  getChapterBookOne,
  updataChapter,
  deleteChapter,
  getChapterBook,
} from "../controllers/ChapterController.js";

import upload from "../plugins/Muter.js";
const router = express.Router();
// router.post("/create-books-chapter/:bookid",createChapter);
router.post(
  "/create-books-chapter/:bookid",
  upload.array("imagechapter"),
  createChapter
);
router.get("/chapter-all-book/:bookid", getChapterBook);
router.get("/chapter-book/:chapterid", getChapterBookOne);
router.delete("/delete-chapter/:chapterid", deleteChapter);
router.put(
  "/updata-chapter/:chapterid",
  upload.array("imagechapter"),
  updataChapter
);

export default router;
