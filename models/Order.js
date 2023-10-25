import mongoose from "mongoose";
const { Schema } = mongoose;

const orderProduct = new mongoose.Schema({
  cart: {
    type: Object,
    required: true,
  },
  mailshop: {
    type: Array,
    required: true,
  },
  shippingAddress: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
  paymentInfo: {
      id: {
         type: String,
      },
      status: {
         type: String,
      },
      type: {
         type: String,
      },
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

export default mongoose.model("Order_Product", orderProduct);
