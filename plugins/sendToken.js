import dotenv from "dotenv";
dotenv.config();
export const sendToken = (token, user, statusCode, res) => {
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };

  res
    .status(statusCode)
    .cookie("authToken", token, options)
    .json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
        fullname: user.fullname,
        // SECRETKEY:user.secretkey
      },
    });
};
export const sendTokenCilent = (token, user, statusCode, res) => {
  const options = {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };

  res
    .status(statusCode)
    .cookie("authToken", token, options)
    .json({ keyuser: user.apiKey, message: "Register Succesfully !" });
};

// export const sendToken = (token, user, statusCode, res) => {
//   const options = {
//     expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
//     httpOnly: true,
//     sameSite: "None",
//     secure: true,
//   };

//   res.status(statusCode).cookie("authToken", token, options).json({
//     success: true,
//     user,
//     token,
//   });
// };
