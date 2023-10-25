import mongoose from "mongoose";
const { Schema } = mongoose;

const withdraw = new mongoose.Schema({
  shopId: {
    type: Object,
    required: true,
  },
  moneyTotal: {
    type: Number,
    required: true,
    default:0
  },
  bankHolderName: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  mailShop: {
    type: String,
    required: true,
  },
  bankAddress: {
    type: String,
    required: true,
  },
  bankAccountId: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default:"รอดำเนินการ"
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: {
    type: Date,
  },
},{timestamps:true}
);

export default mongoose.model("Withdraw", withdraw);
