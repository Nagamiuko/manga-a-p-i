import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import UserAuthRouter from "./router/UserAuthRouter.js";
import BookCreateRouter from "./router/BookCreateRouter.js";
import BookCreateChapter from "./router/ChapterCreateRouter.js";
import BookChapterimage from "./router/ImageChapterRouter.js";
import ADDAdress from "./router/ADDAddres.js";
import ADDCommtent from "./router/ReadingComment.js";
import userall from "./router/UserAll.js";
import BookAdmin from "./router/BookAdmin.js";
import StripeApiKey from "./router/PaymentRouter.js";
import OrderRouter from "./router/OrderProduct.js";
import Withdram from "./router/withdramRouter.js";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
    ],
    ethods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/public", express.static("public"));

mongoose.connect(process.env.MONGOBD_API, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => {
    console.log("connected to mongoDB");
  })
  .on("error", (error) => {
    console.log(error);
  });

app.get("/", async (req, res) => {
  res.status(201).json("message success");
});

app.use("/api/auth", UserAuthRouter);
app.use("/api/books", BookCreateRouter);
app.use("/api/books/chapter", BookCreateChapter);
app.use("/api/books", BookChapterimage);
app.use("/api/address", ADDAdress);
app.use("/api/comment/book", ADDCommtent);
app.use("/api/users", userall);
app.use("/api", BookAdmin);
app.use("/api", StripeApiKey);
app.use("/api", OrderRouter);
app.use("/api", Withdram);
// app.use('/api/books/chapter',BookCreateChapter)
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
