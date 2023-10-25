import express from "express";
import { createBook  ,
         getBookall, 
         getBookAllUser,
         getBookOneDetail,
         getNovelallCompose ,
         getNovelallTranslate,
         getNovelall,
         getBookAll,
         deleteBook,
         updataBook,
         BookAll,
      } from "../controllers/BookController.js";
import upload from "../middleware/Muter.js";

const router = express.Router();
router.post("/create-books/:userid",upload.single("imagecover"),createBook );
router.post("/all-book",getBookall);
router.post("/all-books",getBookAll);
router.post("/all-novel-compose",getNovelallCompose );
router.post("/all-novel-translate",getNovelallTranslate );
router.post("/all-novel",getNovelall );
router.post("/all-book-user/:userid",getBookAllUser);
router.post("/book-detail/:bookid",getBookOneDetail);
// router.post("/book-detail",getBookOneDetail);
router.put("/updata-book/:bookid",upload.single("imagecover"),updataBook);
router.delete("/delete/book/:bookid",deleteBook);
router.get("/",BookAll);

export default router;