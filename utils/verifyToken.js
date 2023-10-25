import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import User from "../models/UserModels.js";
import dotenv from "dotenv";
dotenv.config();

// export const isAuthenticated = createError(async(req, res, next) => {
//   const token = req.cookies;
//   if (!token) {
//     return next(createError(401, " Yuo are not authenticated!"));
//   }
//  const deconed =  jwt.verify(token, process.env.JWT);
//     if (err) return next(createError(403, " Token is not valid!"));
//     req.user = await User.findById(deconed.id);
//     next();
// });

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token ;
   console.log(token);
  if (!token) {
    return next(createError(401, " Yuo are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, " Token is not valid!"));
    req.user = user;
    next();
    console.log("DataUsername:",user);
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id) {
      next();
      console.log("User ST");
    } else {
      if (err) return next(createError(403, " You are not authorized!"));
    }
  });
  console.log("UserID:",req.user.id);
  // console.log("User:",req.user.id);
};
export const isAuthenticated = async (req,res,next) => {
  console.log(req.user);
  const token = req.cookies.access_token;

  if(!token){
      return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT);

  req.user = await User.findById(decoded.id);

  next();
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, " You are not authorized!"));
    }
  });
};
