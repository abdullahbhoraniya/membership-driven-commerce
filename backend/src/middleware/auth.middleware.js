import jwt from "jsonwebtoken"
import { config } from "../utils/config.js";
import userModel from "../models/user.model.js";
import AppError from "../utils/AppError.js";

export const protectRoute = async (req, res, next) => {
  try {
    console.log("Comes in ")
    const token = req.headers.authorization?.split(" ")[1];

    console.log("Requested token",token)

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, config.jwtSecret);

    const userExists = await userModel
      .findById(decoded.id)
      .select("-password");

    console.log(userExists)
    if (!userExists) {
    throw new AppError("Unauthorized",401)
    }

    req.user = userExists;
    next();
  } catch (error) {
    console.log("The error is related to:", error);
    next(error)
  }
};
