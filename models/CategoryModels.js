import mongoose from "mongoose";

const { Schema } = mongoose

const categorySchema = new mongoose.Schema(
   {
     category_main:{
       type:String
     } ,
     category:{
        type:String
      } ,
      rating:{
        type:String
      },
     typebook:{
       type:String
     },
     typebook_singer_a_muti:{
      type:String
     }
   }

)

export default mongoose.model('category',categorySchema)