import express from "express";
import { getImageChapter ,DeleteImage , ImageChapterOne} from "../controllers/ImageChapterBookController.js";

import upload from "../middleware/Muter.js";
const router = express.Router();
// router.post("/create-books-chapter/:bookid",upload.array("imagechapter"),createChapter );
// router.get("/chapter-all-book/:bookid",getChapterBookAll)
 router.get("/chapter-book-image/:chapterid/:bookid",getImageChapter)
 router.post("/chapter-image/:chapterid",ImageChapterOne)
 router.delete("/delete-image/:imageid",DeleteImage)

export default router;