import mongoose from "mongoose";

const { Schema } = mongoose

const chapterSchama = new mongoose.Schema(
   {
      title_name:{
         type:String
      },
      contents:{
         type:String
      },
      books:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'books',
         required:true
      },
      images: [
         {
           public_id: {
             type: String,
             required: true,
           },
           url: {
             type: String,
             required: true,
           },
         },
       ],
   },{timestamps:true}
)

export default mongoose.model('chapterbook' , chapterSchama)