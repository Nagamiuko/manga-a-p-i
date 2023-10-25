import DataImage from "../models/ImageModels.js";
import DataChapter from "../models/ChapterModels.js";

export const getImageChapter = async (req, res) => {
   const chapter_id = req.params.chapterid
   const book_id = req.params.bookid
   try{
     const Data = await DataImage.find({chapterbook:chapter_id}).populate('chapterbook')
     await DataChapter.findById(book_id).populate('books')
     res.status(200).json(Data)
   }catch(err){
      res.status(404).json({message:err})
   }
}
export const ImageChapterOne = async (req, res) => {
   const chapter_id = req.params.chapterid
   try{
     const Data = await DataImage.find({chapterbook:chapter_id}).populate('chapterbook')
     res.status(200).json(Data)
   }catch(err){
      res.status(404).json({message:err})
   }
}
export const DeleteImage = async (req, res) => {
   const image_id = req.params.imageid
   try{
     const Data = await DataImage.findByIdAndDelete(image_id).populate('chapterbook')
     res.status(200).json("Delete Successfully")
   }catch(err){
      res.status(404).json({message:err})
   }
}