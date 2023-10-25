import express from "express";
import {
  createChapter,
  getChapterBookAll,
  getChapterBookOne,
  updataChapter,
  deleteChapter,
} from "../controllers/ChapterController.js";

import upload from "../middleware/Muter.js";
const router = express.Router();
// router.post("/create-books-chapter/:bookid",createChapter);
router.post("/create-books-chapter/:bookid",upload.array("imagechapter"),createChapter);
router.get("/chapter-all-book/:bookid", getChapterBookAll);
router.post("/chapter-book/:chapterid", getChapterBookOne);
router.delete("/delete-chapter/:chapterid", deleteChapter);
router.put("/updata-chapter/:chapterid",upload.array("imagechapter"), updataChapter);

export default router;
