import mongoose from "mongoose";
const {Schema }= mongoose

const Addaddress = new mongoose.Schema(
    {
      nameaddress:{
         type:String
      },
      tel:{
         type:String
      },
      address:{
         type:String
      },
      distrct:{
         type:String
      },
      dists:{
         type:String
      },
      province:{
         type:String
      },
      postalcode:{
         type:String
      },
      typeAddress:{type:String},
      mangauser:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'mangauser',
         required:true
      }
    },
    {timestamps:true}
)
export default mongoose.model('useraddress',Addaddress)
