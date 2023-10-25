import mongoose from "mongoose";

const { Schema } = mongoose

const ImageSchema = new mongoose.Schema(
   {
      image:{
         type:String
      },
      filename:{
         type:String
      },
      imageNumber:{
         type:Number
      },
      chapterbook:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'chapterbook',
         required:true
      },
      imagebaes64:{
         type:String
      }
   }
)

export default mongoose.model('image',ImageSchema)