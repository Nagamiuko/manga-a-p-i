import mongoose from "mongoose";
const {Schema} = mongoose

const userSchemas = new mongoose.Schema(
   {
      userId:{
         type:String,
         required:true
      },
      email: {
         type:String,
         unique: true 
      },
      fullname:{
         type:String,
         required:true
      },
      namedisplay:{
         type:String,
      },
      username: {
         type: String,
         required:true
      },
      password: {
         type: String,
         select: false,
      },
      credit: {
         type: Number,
         default:0
      },
      total_money: {
         type: Number,
         default:0
      },
      avatar:{
        public_id:{
           type:String
         },
        avatar_url:{
           type:String
        },
        image_name:{
           type:String,
        }
      },
      sex:{
         type:String,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
 },
 {timestamps: true}
)
export default mongoose.model("mangauser", userSchemas)