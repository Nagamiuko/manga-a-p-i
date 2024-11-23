import mongoose from "mongoose";

const mongo = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGOBD_API, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection
      .once("open", () => {
        console.log("Connected to mongoDB successfully!");
        resolve();
      })
      .on("error", (error) => {
        console.log("Error connecting to mongoDB:", error);
        reject(error);
      });
  });
};

export default mongo;
