import ChapterData from "../models/ChapterModels.js";
import BookData from "../models/BookModels.js";
import ImageChapter from "../models/ImageModels.js";
import cloudinary from "../cloudinary/cloudinary.js";
import fs from "fs";
import BookModels from "../models/BookModels.js";
import UserModels from "../models/UserModels.js";
import { prisma } from "../plugins/prismaClient.js";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { clients3, uploadParams } from "../plugins/cloudObject.js";
import { log } from "console";
export const createChapter = async (req, res, next) => {
  const bid = req.params.bookid;
  const { title_name, contents } = req.body;
  const imagechapter = req.files;

  //   let imaArry = imagechapter.map((file) => {
  //     let img = fs.readFileSync(file.path);
  //     return img.toString("base64");
  //   });
  console.log(imagechapter);
  // console.log(req.body.images);
  try {
    // let images = [];
    // if (typeof req.body.image === "string") {
    //    images.push(req.body.image);
    //  } else {
    //    images = req.body.image;
    //  }

    // const imagesLinks = [];
    // for (let i = 0; i < images.length; i++) {
    //   const result = await cloudinary.v2.uploader.upload(images[i], {
    //    resource_type:'auto'
    //   });

    //   imagesLinks.push({
    //     public_id: result.public_id,
    //     url: result.secure_url,
    //   });
    // }

    const newChapterBook = await prisma.chapter.create({
      data: {
        title_name: title_name,
        contents: contents,
        bookId: bid,
      },
    });

    await Promise.all(
      imagechapter.map(async (dataimage, index) => {
        const keyId = uuidv4();
        const i = uploadParams(dataimage, "image_chapter");
        const save = new PutObjectCommand(i);
        await clients3.send(save);

        const url = `https://service-bb.overletworld.online/${i.Key}`;

        await prisma.image.create({
          data: {
            public_id: keyId,
            imageNumber: index,
            url: url,
            chapterId: newChapterBook.id,
          },
        });
      })
    );
    res.status(200).json({ message: "create chapter successfully!" });
  } catch (err) {
    res.status(404).json({ message: "create chapter failed !!" });
    console.log(err);
  }
};
export const updataChapter = async (req, res, next) => {
  const chapid = req.params.chapterid;
  const { title_name, contents, book_pdf } = req.body;
  const imagechapter = req.files;
  console.log(imagechapter);
  console.log(title_name, contents);
  console.log(chapid);
  // console.log(req.files.path);
  let imaArry = imagechapter.map((file) => {
    let img = fs.readFileSync(file.path);
    return img.toString("base64");
  });
  try {
    if (imagechapter) {
      const UpdataChapterBook = await ChapterData.findByIdAndUpdate(
        chapid,
        {
          $set: {
            title_name: title_name,
            contents: contents,
            book_pdf: book_pdf,
          },
        },
        { new: true }
      );
      imaArry.map((dataimage, index) => {
        const newImageChapter = {
          chapterbook: UpdataChapterBook._id,
          image: imagechapter[index].filename,
          filename: imagechapter[index].originalname,
          imageNumber: index + 1,
        };
        const newImage = new ImageChapter(newImageChapter);
        return newImage.save();
      });
      res.status(200).json(UpdataChapterBook);
    } else {
      const newChapterBook = await ChapterData.findByIdAndUpdate(
        chapid,
        {
          $set: {
            title_name: title_name,
            contents: contents,
            book_pdf: book_pdf,
          },
        },
        { new: true }
      );
      res.status(200).json(newChapterBook);
      console.log(newChapterBook);
    }
  } catch (err) {
    res.status(404).json(err);
    console.log(err);
  }
};

export const getChapterBook = async (req, res, next) => {
  const book_id = req.params.bookid;
  try {
    const Data = await prisma.chapter.findMany({
      where: {
        bookId: book_id,
      },
      include: {
        images: {
          select: {
            public_id: true,
          },
        },
      },
    });
    res.status(200).json({
      message: "read chapter full one book successfully !",
      data: Data,
    });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const getChapterBookOne = async (req, res, next) => {
  const chapter_id = req.params.chapterid;
  try {
    const Data = await prisma.chapter.findFirst({
      where: {
        id: chapter_id,
      },
      include: {
        images: {
          select: {
            imageNumber: true,
            url: true,
            public_id: true,
          },
        },
      },
    });
    res
      .status(200)
      .json({ message: "read one chapter successfully !", data: Data });
  } catch (err) {
    res.status(404).json({ message: "read one chapter failed !" });
    console.log(err);
  }
};

export const getChapterBookAllAdmin = async (req, res, next) => {
  const book_id = req.params.bookid;
  try {
    const bookchapter = await ChapterData.find({
      books: book_id,
    }).populate("books");
    res.status(200).json({ success: true, bookchapter });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const deleteChapter = async (req, res, next) => {
  const chapter_id = req.params.chapterid;
  try {
    const Data = await ChapterData.findByIdAndDelete(chapter_id).populate(
      "books"
    );
    res.status(200).json("Delete Successfully");
  } catch (err) {
    res.status(404).json({ message: err });
  }
};
