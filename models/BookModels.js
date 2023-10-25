import mongoose from "mongoose";
const { Schema } = mongoose

const bookSchemas = new mongoose.Schema(
   {
     title:{
       type:String,
     },
     a_name:{
       type:String
     },
     t_name:{
       type:String
     },
     //ใสคำบรรยาย
     tagline:{
      type: String,
    },
    //เรื่องย่อ
     synopsis:{
      type: String,
    },
    cover_image:{
      public_id:{
        type:String
      },
      cover_image_url:{
        type:String
      },
      cover_name:{
        type:String
      }
    } ,
    price_of_free:{
      type:Number,
      default:0 
    },
    free:{
      type:String,
      default:'ฟรี'
    },
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
    },
    typebookAndnovel:{
      type:String
    },
    book_pdf:{
      book_pdf_full:{
         type:String
      },
      book_pdf_try:{
         type:String
      },
   },
    shopId:{
      type: String,
      required:true
    },
    mangauser:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'mangauser',
      required:true
    }
   },
   {timestamps:true}
)

export default mongoose.model('books',bookSchemas)