import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import { ROCKET_TOKEN } from "../constants/config.js";
import { User } from "../models/user.js";

const isAuthenticated = TryCatch((req, res, next) => {
  const token = req.cookies[ROCKET_TOKEN];
  if (!token)
    return next(new ErrorHandler("Please login to access this route", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;
  req.gender=decodedData.gender;

  next();
});
export { isAuthenticated };
