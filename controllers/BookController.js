import DataBooks from "../models/BookModels.js";
import DataChapterBook from "../models/ChapterModels.js";
import cloudinary from "../cloudinary/cloudinary.js";
import { prisma } from "../plugins/prismaClient.js";
import { clients3, uploadParams } from "../plugins/cloudObject.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const createBook = async (req, res) => {
  const userId = req.params.userid;
  const {
    titlebook,
    tname,
    aname,
    rating,
    categoryone,
    categorywto,
    tagline,
    synopsis,
    tybook,
    typebook,
    typeprice,
    typebookAndnovel,
    freeBook,
    book_pdf_full,
    book_pdf_try,
    shopid,
  } = req.body;

  const imagecover = req.file;
  try {
    // const reCheck = await prisma.book.findFirst({
    //   where: {
    //     mangauserId: userId,
    //   },
    // });
    // if (reCheck == null)
    //   return res.status(401).json({ message: "This Book not found !!" });
    // if (reCheck.cover_image_url) {
    //   const oldImageKey = reCheck.cover_image_url.split("/").pop();
    //   const Deletes = deleteParams(oldImageKey, "profile");
    //   const command = new DeleteObjectCommand(Deletes);
    //   await clients3.send(command);
    // }
    const i = uploadParams(imagecover, "upload_cover");
    const save = new PutObjectCommand(i);
    await clients3.send(save);
    const url = `https://service-bb.overletworld.online/${i.Key}`;
    const saveBook = await prisma.books.create({
      data: {
        title: titlebook,
        t_name: tname,
        a_name: aname,
        tagline: tagline,
        synopsis: synopsis,
        price_of_free: typeprice,
        free: freeBook,
        rating: rating,
        category_main: categoryone,
        category: categorywto,
        typebook: tybook,
        typebook_singer_a_muti: typebook,
        shopId: shopid,
        typebookAndnovel: typebookAndnovel,
        coverImage: url,
        mangauserId: userId,
        // bookPdf: {
        //   create: {
        //     book_pdf_full: book_pdf_full,
        //     book_pdf_try: book_pdf_try,
        //   },
        // },
      },
    });
    res
      .status(201)
      .json({ message: "create book successfully !!", data: saveBook });
    console.log(saveBook);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};
export const updataBook = async (req, res) => {
  const bookId = req.params.bookid;
  const {
    titlebook,
    tname,
    aname,
    rating,
    categoryone,
    categorywto,
    tagline,
    synopsis,
    tybook,
    typebook,
    typeprice,
    typebookAndnovel,
    freeBook,
    book_pdf_full,
    book_pdf_try,
  } = req.body;

  const imagecover = req.file ? req.file.filename : null;
  try {
    if (imagecover) {
      const curFile = await DataBooks.findById(bookId);
      if (imagecover !== "") {
        const fileimage = curFile.public_id;
        if (fileimage) {
          await cloudinary.uploader.destroy(fileimage);
          console.log(fileimage);
        }
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: imagecover,
        resource_type: "auto",
        folder: "avatar",
      });
      const Data = await DataBooks.findByIdAndUpdate(
        bookId,
        {
          $set: {
            title: titlebook,
            t_name: tname,
            a_name: aname,
            tagline: tagline,
            synopsis: synopsis,
            price_of_free: typeprice,
            free: freeBook,
            cover_image: {
              public_id: result.public_id,
              cover_image_url: result.secure_url,
              cover_name: imagecover,
            },
            rating: rating,
            category_main: categoryone,
            category: categorywto,
            typebook: tybook,
            typebook_singer_a_muti: typebook,
            typebookAndnovel: typebookAndnovel,
            book_pdf: {
              book_pdf_full: book_pdf_full,
              book_pdf_try: book_pdf_try,
            },
          },
        },
        { new: true }
      ).populate("mangauser");
      res.status(200).json("Updata Successfully ");
      console.log(Data);
    }
    if (!imagecover) {
      const Data = await DataBooks.findByIdAndUpdate(
        bookId,
        {
          $set: {
            title: titlebook,
            t_name: tname,
            a_name: aname,
            tagline: tagline,
            synopsis: synopsis,
            price_of_free: typeprice,
            free: freeBook,
            rating: rating,
            category_main: categoryone,
            category: categorywto,
            typebook: tybook,
            typebook_singer_a_muti: typebook,
            typebookAndnovel: typebookAndnovel,
            book_pdf: {
              book_pdf_full: book_pdf_full,
              book_pdf_try: book_pdf_try,
            },
          },
        },
        { new: true }
      );
      res.status(200).json("Updata Successfully ");
      console.log(Data);
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const Data = await DataBooks.findByIdAndDelete(req.params.bookid).populate(
      "mangauser"
    );
    res.status(200).json("Delete Successfully ");
  } catch (err) {
    next(err);
  }
};

export const getBookall = async (req, res, next) => {
  try {
    const Data = await DataBooks.find().populate(["mangauser"]);
    res.status(200).json(Data);
  } catch (err) {
    next(err);
  }
};
export const getBookAll = async (req, res, next) => {
  try {
    const Data = await prisma.books.findMany({
      select: {
        a_name: true,
        category: true,
        category_main: true,
        coverImageId: true,
        createdAt: true,
        free: true,
        id: true,
        mangauserId: true,
        price_of_free: true,
        rating: true,
        shopId: true,
        synopsis: true,
        t_name: true,
        tagline: true,
        title: true,
        typebook: true,
        typebookAndnovel: true,
        typebook_singer_a_muti: true,
        updatedAt: true,
        coverImage: true,
        User: {
          select: {
            namedisplay: true,
            fullname: true,
            id: true,
          },
        },
      },
    });
    res.status(201).json({ message: "read full book all", data: Data });
  } catch (err) {
    next(err);
  }
};
export const getNovelallCompose = async (req, res, next) => {
  try {
    const Data = await DataBooks.find({
      typebook_singer_a_muti: "นิยายแต่ง",
    }).populate(["mangauser"]);
    res.status(200).json(Data);
    // res.status(200).json({message:'Books All',  data:Data});
  } catch (err) {
    next(err);
  }
};
export const getNovelallTranslate = async (req, res, next) => {
  try {
    const Data = await DataBooks.find({
      typebook_singer_a_muti: "นิยายแปล",
    }).populate(["mangauser"]);
    res.status(200).json(Data);
    // res.status(200).json({message:'Books All',  data:Data});
  } catch (err) {
    next(err);
  }
};
export const getNovelall = async (req, res, next) => {
  try {
    const Data = await DataBooks.find({
      typebookAndnovel: "หนังสือนิยาย",
    }).populate(["mangauser"]);
    res.status(200).json(Data);
    // res.status(200).json({message:'Books All',  data:Data});
  } catch (err) {
    next(err);
  }
};

export const getBookAllUser = async (req, res, next) => {
  try {
    const Data = await prisma.books.findMany({
      where: {
        mangauserId: req.params.userid,
      },
      select: {
        a_name: true,
        bookPdfId: true,
        category: true,
        category_main: true,
        coverImageId: true,
        createdAt: true,
        free: true,
        id: true,
        mangauserId: true,
        price_of_free: true,
        rating: true,
        shopId: true,
        synopsis: true,
        t_name: true,
        tagline: true,
        title: true,
        typebook: true,
        typebookAndnovel: true,
        typebook_singer_a_muti: true,
        updatedAt: true,
        coverImage: true,
        User: {
          select: {
            namedisplay: true,
            fullname: true,
            id: true,
          },
        },
      },
    });
    res
      .status(200)
      .json({ message: "read full book list success !", data: Data });
  } catch (err) {
    next(err);
  }
};
export const getBookAllUsers = async (req, res, next) => {
  try {
    const Data = await DataBooks.find({
      mangauser: req.params.userid,
    }).populate("mangauser");
    res.status(200).json({ success: true, Data });
  } catch (err) {
    next(err);
  }
};

export const getBookOneDetail = async (req, res, next) => {
  try {
    const Data = await prisma.books.findFirst({
      where: {
        id: req.params.bookid,
      },
      include: {
        User: {
          select: {
            namedisplay: true,
            fullname: true,
            id: true,
          },
        },
      },
    });
    res.status(200).json({ message: "read detail book ", data: Data });
  } catch (err) {
    res.status(404).json({ message: "read detail failed ", error: err });
    console.log(err);
  }
};

export const BookAll = async (req, res, next) => {
  try {
    const books = await DataBooks.find().populate("mangauser");
    res.status(200).json({ success: true, books });
  } catch (err) {
    next(err);
  }
};

export const getBookOneDetailAdmin = async (req, res, next) => {
  try {
    const Data = await DataBooks.findById(req.params.bookid).populate(
      "mangauser"
    );
    res.status(200).json({ success: true, Data });
  } catch (err) {
    next(err);
  }
};

export const addWishBookToMe = async (req, res, next) => {
  try {
    const reCheck = await prisma.watchlist.findFirst({
      where: {
        userId: req.params.userid,
        productId: req.params.bookid,
      },
    });
    if (reCheck)
      return res.status(400).json({ message: "You already have this item!" });
    await prisma.watchlist.create({
      data: {
        userId: req.params.userid,
        productId: req.params.bookid,
      },
    });
    res.status(200).json({ message: "add book wish success 😊 " });
  } catch (err) {
    res.status(404).json({ message: "read detail failed ", error: err });
    console.log(err);
  }
};

export const removeWishBookToMe = async (req, res, next) => {
  try {
    const reCheck = await prisma.watchlist.findFirst({
      where: {
        userId: req.params.userid,
      },
    });

    if (!reCheck)
      return res.status(400).json({ message: "Watchlist item not found!" });
    await prisma.watchlist.deleteMany({
      where: { productId: req.params.watchid },
    });
    res.status(200).json({ message: "remove book watch success 😊 " });
  } catch (err) {
    res.status(404).json({ message: "remove book watch failed ", error: err });
    console.log(err);
  }
};

export const getWishBookToMe = async (req, res, next) => {
  const { userid } = req.params;
  console.log("list wish", userid);

  try {
    const Data = await prisma.watchlist.findMany({
      where: {
        userId: userid,
      },
      include: {
        product: {
          select: {
            a_name: true,
            bookPdfId: true,
            category: true,
            category_main: true,
            coverImageId: true,
            createdAt: true,
            free: true,
            id: true,
            mangauserId: true,
            price_of_free: true,
            rating: true,
            shopId: true,
            synopsis: true,
            t_name: true,
            tagline: true,
            title: true,
            typebook: true,
            typebookAndnovel: true,
            typebook_singer_a_muti: true,
            updatedAt: true,
            coverImage: true,
            User: {
              select: {
                namedisplay: true,
                fullname: true,
                id: true,
              },
            },
          },
        },
      },
    });
    res
      .status(200)
      .json({ message: "read full book wish success 😊 ", data: Data });
  } catch (err) {
    res.status(404).json({ message: "read book wish failed ", error: err });
    console.log(err);
  }
};
