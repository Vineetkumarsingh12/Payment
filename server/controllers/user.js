import { compare } from "bcrypt";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import {
  cookieOptions,
  sendToken,
  uploadFilesToCloudinary,
} from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import bcrypt from "bcrypt";

// Create a new user and save it to the database and save token in cookie
const newUser = TryCatch(async (req, res, next) => {
  const { name,email, password,gender } = req.body;
  console.log("inside new user");
  console.log(req.body);

//find user by email
  const exist=await User.findOne({email});
  if(exist){
    return next(new ErrorHandler("User already exists", 400));
  }

  const file = req.file;

  if (!file) return next(new ErrorHandler("Please Upload Avatar"));

  const result = await uploadFilesToCloudinary([file]);

  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };


  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("1");
  console.log(hashedPassword);



  const user = await User.create({
    name,
    password:hashedPassword,
    avatar,
    email,
    gender
  });

  sendToken(res, user, 201, "User created");
});

// Login user and save token in cookie
const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email }).select("+password");


  console.log(user);
 console.log("1");

  if (!user) return next(new ErrorHandler("Invalid email or Password", 404));
  console.log("2");

  const isMatch = await compare(password, user.password);


  console.log("3");
  if (!isMatch)
    return next(new ErrorHandler("Invalid email or Password", 404));
     user.password = undefined;

  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
});



const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("rocket-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});




  



export {
  login,
  logout,
  newUser,
};
