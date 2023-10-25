import mongoose from "mongoose";

const { Schema } = mongoose

const ReadingSchema = new mongoose.Schema(
   {
      textreview:{
         type:String
      },
      views:{
         type:String
      },
      chapterbook:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'chapterbook',
         // required:true
      },
      books:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'books',
         // required:true
      },
      mangauser:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'mangauser',
         required:true
      },
   },{timestamps:true}
)

export default mongoose.model('reading_history',ReadingSchema)