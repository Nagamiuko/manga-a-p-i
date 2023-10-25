import DataBooks from '../models/BookModels.js'
import DataChapterBook from '../models/ChapterModels.js'
import cloudinary from '../cloudinary/cloudinary.js'
import fs from 'fs'
import path from 'path'

export const createBook = async (req , res ) =>{
    const userId = req.params.userid 
    const { titlebook,
            tname  ,
            aname  ,
            rating  ,
            categoryone ,
            categorywto ,
            tagline,
            synopsis, 
            tybook,
            typebook,
            typeprice,
            typebookAndnovel,   
            freeBook , 
            book_pdf_full,
            book_pdf_try ,
            shopid  , 
            } = req.body
    
    const imagecover = req.file ? req.file.filename : null
    try{
      const result = await cloudinary.uploader.upload(
        req.file.path,
          { 
            resource_type:'auto'
          }
       ) 
      const saveBook = await DataBooks.create({
            title:titlebook,
            t_name:tname,
            a_name:aname,
            tagline:tagline,
            synopsis:synopsis,
            price_of_free:typeprice,
            free:freeBook,
            cover_image:{
              public_id:result.public_id,
              cover_image_url:result.secure_url,
              cover_name:imagecover,
            },
            rating:rating,
            category_main:categoryone,
            category:categorywto,
            typebook:tybook,
            typebook_singer_a_muti:typebook,
            shopId: shopid,
            mangauser: userId,
            typebookAndnovel:typebookAndnovel,
            book_pdf:{
              book_pdf_full:book_pdf_full,
              book_pdf_try:book_pdf_try
           },
          })
          res.status(200).json(saveBook)
          console.log(saveBook);
    }catch(err){
      console.log(err)
      res.status(404).json(err)
    }
} 
export const updataBook = async (req , res ) =>{
    const bookId = req.params.bookid 
    const { 
            titlebook,
            tname  ,
            aname  ,
            rating  ,
            categoryone ,
            categorywto ,
            tagline,
            synopsis, 
            tybook,
            typebook,
            typeprice,
            typebookAndnovel,
            freeBook, 
            book_pdf_full,
            book_pdf_try          
            } = req.body

    const imagecover = req.file ? req.file.filename : null
      console.log(book_pdf_full);
      console.log( book_pdf_try );
    try{
      if(imagecover){
       const curFile = await DataBooks.findById(bookId)
      if(imagecover !== ''){
         const fileimage = curFile.public_id
         if(fileimage){
             await cloudinary.uploader.destroy(fileimage)
             console.log(fileimage)
         }
        }
    const result = await cloudinary.uploader.upload(req.file.path,
           {
                public_id: imagecover,
                resource_type:"auto",
                folder: 'avatar'
           }
        )
     const Data =  await DataBooks.findByIdAndUpdate(bookId,{
          $set:{
            title:titlebook,
            t_name:tname,
            a_name:aname,
            tagline:tagline,
            synopsis:synopsis,
            price_of_free:typeprice,
            free:freeBook,
            cover_image:{
              public_id:result.public_id,
              cover_image_url:result.secure_url,
              cover_name:imagecover,
            },
            rating:rating,
            category_main:categoryone,
            category:categorywto,
            typebook:tybook,
            typebook_singer_a_muti:typebook,
            typebookAndnovel:typebookAndnovel,
            book_pdf:{
              book_pdf_full:book_pdf_full,
              book_pdf_try:book_pdf_try
           },
          }
         },
          {new:true}
          ).populate("mangauser")
          res.status(200).json("Updata Successfully ")
          console.log(Data);
     }
    if(!imagecover){
      const Data =  await DataBooks.findByIdAndUpdate(bookId,{
            $set:{
              title:titlebook,
              t_name:tname,
              a_name:aname,
              tagline:tagline,
              synopsis:synopsis,
              price_of_free:typeprice,
              free:freeBook,
              rating:rating,
              category_main:categoryone,
              category:categorywto,
              typebook:tybook,
              typebook_singer_a_muti:typebook,
              typebookAndnovel:typebookAndnovel,
              book_pdf:{
                book_pdf_full:book_pdf_full,
                book_pdf_try:book_pdf_try
             },
            }
           },
            {new:true}
            )
            res.status(200).json("Updata Successfully ")
            console.log(Data);
     }
    }catch(err){
      console.log(err)
      res.status(404).json(err)
    }
} 

export const deleteBook = async (req, res, next) => {
  try {
    const Data = await DataBooks.findByIdAndDelete(req.params.bookid).populate('mangauser');
    res.status(200).json("Delete Successfully ");
  } catch (err) {
    next(err);
  }
};

export const getBookall = async (req, res, next) => {
  try {
    const Data = await DataBooks.find().populate(['mangauser']);
    res.status(200).json(Data);
  } catch (err) {
    next(err);
  }
};
export const getBookAll = async (req, res, next) => {
  try {
    const Data = await DataBooks.find({
       typebookAndnovel:"หนังสือการ์ตูน"
    }).populate(['mangauser']);
    res.status(200).json(Data);
    // res.status(200).json({message:'Books All',  data:Data});
  } catch (err) {
    next(err);
  }
};
export const getNovelallCompose = async (req, res, next) => {
  try {
    const Data = await DataBooks.find({typebook_singer_a_muti:'นิยายแต่ง'}).populate(['mangauser']);
    res.status(200).json(Data);
    // res.status(200).json({message:'Books All',  data:Data});
  } catch (err) {
    next(err);
  }
};
export const getNovelallTranslate = async (req, res, next) => {
  try {
    const Data = await DataBooks.find({typebook_singer_a_muti:'นิยายแปล'}).populate(['mangauser']);
    res.status(200).json(Data);
    // res.status(200).json({message:'Books All',  data:Data});
  } catch (err) {
    next(err);
  }
};
export const getNovelall = async (req, res, next) => {
  try {
    const Data = await DataBooks.find(
       {typebookAndnovel:'หนังสือนิยาย'}
       ).populate(['mangauser']);
    res.status(200).json(Data);
    // res.status(200).json({message:'Books All',  data:Data});
  } catch (err) {
    next(err);
  }
};

export const getBookAllUser = async (req, res, next) => {
  try {
    const Data = await DataBooks.find({
       mangauser:req.params.userid
    }).populate('mangauser');
    res.status(200).json(Data);
  } catch (err) {
    next(err);
  }
};
export const getBookAllUsers = async (req, res, next) => {
  try {
    const Data = await DataBooks.find({
       mangauser:req.params.userid
    }).populate('mangauser');
    res.status(200).json({success:true , Data});
  } catch (err) {
    next(err);
  }
};

export const getBookOneDetail = async (req, res, next) => {
  try {
    const Data = await DataBooks.findById(req.params.bookid).populate('mangauser');
    res.status(200).json(Data);
  } catch (err) {
    next(err);
  }
};

export const BookAll = async (req, res, next) => {
  try {
    const books = await DataBooks.find().populate('mangauser');
    res.status(200).json({success:true ,books});
  } catch (err) {
    next(err);
  }
};

export const getBookOneDetailAdmin = async (req, res, next) => {
  try {
    const Data = await DataBooks.findById(req.params.bookid).populate('mangauser');
    res.status(200).json({success:true , Data});
  } catch (err) {
    next(err);
  }
};
// export const getBookOneDetail = async (req, res, next) => {
//     const {Book_id} = req.query
//   try {
//     const Data = await DataBooks.findById(Book_id).populate('mangauser');
//     res.status(200).json(Data);
//   } catch (err) {
//     next(err);
//   }
// };
