import ReadingHistrory from "../models/ReadingHistrory.js";

export const CommentChapterHistory = async (req, res) => {
  const { textcomment } = req.body;
  const userID = req.params.userid;
  const chapterbookID = req.params.chapterid;
  try {
    const saveComment = new ReadingHistrory({
      textreview: textcomment,
      chapterbook: chapterbookID,
      mangauser: userID,
    });
    const saveComments = await saveComment.save();
    res.status(200).json(saveComments);
  } catch (err) {
    res.status(404).json("Not Falie");
    console.log(err);
  }
};
export const CommentBookHistory = async (req, res) => {
  const { textcomment } = req.body;
  const userID = req.params.userid;
  const bookID = req.params.bookid;
  try {
    const saveComment = new ReadingHistrory({
      textreview: textcomment,
      books: bookID,
      mangauser: userID,
    });
    const saveComments = await saveComment.save();
    res.status(200).json(saveComments);
  } catch (err) {
    res.status(404).json("Not Falie");
    console.log(err);
  }
};
export const getCommentBook = async (req, res) => {
  const bookID = req.params.bookid;
  try {
   //  const getmentBook = await ReadingHistrory.find({
   //    mangauser: userID,
   //    books: bookID,
   //  }).populate('mangauser');
    const getmentBook = await ReadingHistrory.find({ books: bookID}).populate('mangauser');
    res.status(200).json(getmentBook);
  } catch (err) {
    res.status(404).json("Not Falie");
    console.log(err);
  }
};

export const getCommentChapter = async (req, res) => {
  const chapterbookID = req.params.chapterid;
  try {
    const getComment = await ReadingHistrory.find({
      chapterbook: chapterbookID,
    }).populate("mangauser");
    res.status(200).json(getComment);
  } catch (err) {
    res.status(404).json("Not Falie");
    console.log(err);
  }
};
