import ReadingHistrory from "../models/ReadingHistrory.js";
import { prisma } from "../plugins/prismaClient.js";
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
    await prisma.review.create({
      data: {
        textreview: textcomment,
        booksId: bookID,
        userId: userID,
      },
    });
    res.status(200).json({ message: "comment successfully !" });
  } catch (err) {
    res.status(404).json("Not Falie");
    console.log(err);
  }
};

export const CommentBookRespond = async (req, res) => {
  const { textcomment } = req.body;
  const { userid, bookid, reviewid } = req.params;

  try {
    await prisma.reviewrespond.create({
      data: {
        textreview: textcomment,
        booksId: bookid,
        userId: userid,
        reviewId: reviewid,
      },
    });
    res.status(200).json({ message: "comment successfully !" });
  } catch (err) {
    res.status(404).json("Not Falie");
    console.log(err);
  }
};
export const getCommentBook = async (req, res) => {
  const bookID = req.params.bookid;
  try {
    const commentBook = await prisma.review.findMany({
      where: { booksId: bookID },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            namedisplay: true,
            avatar: true,
          },
        },
        responses: {
          select: {
            textreview: true,
            views: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                fullname: true,
                namedisplay: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
    res
      .status(200)
      .json({ message: "read full comment successfully", data: commentBook });
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
