import express from "express";
import {
  CommentChapterHistory,
  CommentBookHistory,
  getCommentChapter,
  getCommentBook,
} from "../controllers/ReadingHistory.js";
const router = express.Router();
// router.post("/create-books-chapter/:bookid",upload.array("imagechapter"),createChapter );
// router.get("/chapter-all-book/:bookid",getChapterBookAll)
router.post("/comment-chapter/:chapterid/:userid", CommentChapterHistory);
router.post("/comment-book/:bookid/:userid", CommentBookHistory);
router.get("/comment-chapter/:chapterid", getCommentChapter);
router.get("/comment-book/:bookid", getCommentBook);
//  router.delete("/delete-image/:imageid",DeleteImage)

export default router;
