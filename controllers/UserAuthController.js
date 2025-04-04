import User from "../models/UserModels.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "../plugins/prismaClient.js";
import { sendToken } from "../plugins/sendToken.js";
import {
  clients3,
  deleteParams,
  uploadParams,
} from "../plugins/cloudObject.js";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
dotenv.config();

export const registe = async (req, res, next) => {
  const { email, username, password, fullname } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const reCheck = await prisma.user.findFirst({
      where: {
        username: username,
        email: email,
      },
    });
    if (reCheck)
      return res.status(401).json({ message: "This user already exists." });

    const newUser = await prisma.user.create({
      data: {
        email: email,
        fullname: fullname,
        username: username,
        password: hash,
      },
    });
    res
      .status(200)
      .json({ message: "User create successfully !", data: newUser });
  } catch (err) {
    res.status(404).json({ msg: "Create not Failed !!" });
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return next(createError(400, "Wromg password or username!"));

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    sendToken(token, user, 200, res);
  } catch (err) {
    res.status(404).json({ message: "Login not Failed !!" });
    console.log(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { fullname, displayName, sex, email } = req.body;
  const { userId } = req.params;

  console.log({ displayName, fullname });

  try {
    const reCheck = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!reCheck)
      return res.status(401).json({ message: "This user not found !!" });
    const update = await prisma.user.update({
      where: { id: userId },
      data: {
        fullname: fullname,
        namedisplay: displayName,
        email: email,
        sex: sex,
      },
      select: {
        id: true,
        email: true,
        username: true,
        namedisplay: true,
        fullname: true,
        credit: true,
        total_money: true,
        avatar: true,
        sex: true,
        Book: true,
        Address: true,
      },
    });
    res.status(200).json({ data: update, message: "Update successfully !!" });
  } catch (err) {
    next(err);
  }
};
export const updateUserImage = async (req, res, next) => {
  const { userId } = req.params;
  const ImageProfile = req.file;
  try {
    const reCheck = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!reCheck)
      return res.status(401).json({ message: "This user not found !!" });
    if (reCheck.avatar) {
      const oldImageKey = reCheck.avatar.split("/").pop();
      const Deletes = deleteParams(oldImageKey, "profile");
      const command = new DeleteObjectCommand(Deletes);
      await clients3.send(command);
    }
    const i = uploadParams(ImageProfile, "profile");
    const save = new PutObjectCommand(i);
    await clients3.send(save);
    const url = `https://service-bb.overletworld.online/${i.Key}`;
    const updata = await prisma.user.update({
      where: { id: userId },
      data: {
        avatar: url,
      },
      select: {
        id: true,
        email: true,
        username: true,
        namedisplay: true,
        fullname: true,
        credit: true,
        total_money: true,
        avatar: true,
        sex: true,
        Book: true,
      },
    });
    res.status(200).json({ user: updata, message: "Update successfully !!" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const UserDelete = async (req, res) => {
  const userId = req.params.userid;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json("Delete Succesfully ('-')");
  } catch (err) {
    res.status(404).json("NoT Delete User !");
    console.log(err);
  }
};

export const loginLine = async (req, res, next) => {
  try {
    const { userId, displayName, pictureUrl } = req.body;
    var data = {
      fullname: displayName,
      username: userId,
      avatar: {
        avatar_url: pictureUrl,
      },
    };
    var user = await User.findOneAndUpdate({ username: userId }, { new: true });
    if (user) {
      console.log("user updata");
    } else {
      user = new User(data);
      await user.save();
      console.log("new user ");
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
    next("Login Successfully!");
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const userUpdateCredit = async (req, res, next) => {
  try {
    const { availablePrice, totalMonneyShop } = req.body;
    let userid = req.params.id;
    var credits = await User.findByIdAndUpdate(
      userid,
      {
        $set: {
          total_money: totalMonneyShop,
          credit: availablePrice,
        },
      },
      { new: true }
    );
    res.status(200).json({ success: true, credits });
  } catch (err) {
    next(err);
    console.log(err);
  }
};
export const getUser = async (req, res, next) => {
  const { userId } = req.query;
  console.log(userId);

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        username: true,
        namedisplay: true,
        fullname: true,
        credit: true,
        total_money: true,
        avatar: true,
        sex: true,
        Book: true,
        Address: true,
        watchlist: true,
      },
    });

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
};

export const rePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("+password");
    const isPasswordCorrect = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Old password is incorrect!" });
    }
    // const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    // if (!isPasswordMatched) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Old password is incorrect!" });
    // }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password doesn't matched with each other!",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newPassword, salt);
    user.password = hash;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    return next(error.message, 500);
  }
};
