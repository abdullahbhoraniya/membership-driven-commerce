import crypto from "crypto";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import sessionModel from "../models/session.model.js";
import AppError from "../utils/AppError.js";
import { config } from "../utils/config.js";

const hashPassword = (password) =>
  crypto.createHash("sha256").update(password).digest("hex");

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const createAccessToken = (userId) =>
  jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: "15m" });

const createRefreshToken = (userId) =>
  jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: "7d" });

export const register = async (userName, email, password) => {
  const userExist = await userModel.findOne({
    $or: [{ email }, { userName }]
  });

  if (userExist) {
    throw new AppError("User already registered with this email or username", 409);
  }

  const passwordHashed = hashPassword(password);
  const newUser = await userModel.create({
    userName,
    email,
    password: passwordHashed,
    verified: true
  });

  return {
    success: true,
    user: {
      userName: newUser.userName,
      email: newUser.email
    }
  };
};

export const login = async (email, password, ip, userAgent) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const passwordHashed = hashPassword(password);
  if (passwordHashed !== user.password) {
    throw new AppError("Invalid credentials", 401);
  }

  const refreshToken = createRefreshToken(user._id);
  const refreshTokenHash = hashToken(refreshToken);

  await sessionModel.create({
    userId: user._id,
    refreshTokenHash,
    ip,
    userAgent
  });

  const accessToken = createAccessToken(user._id);
  console.log("UserData after login",user)
  return {
    success: true,
    accessToken,
    refreshToken,
    userData: user
  };
};

export const currentData = async (token) => {
  const decoded = jwt.verify(token, config.jwtSecret);
  const user = await userModel.findById(decoded.id).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return {
    success: true,
    user
  };
};

export const refresTokenCreation = async (refreshToken) => {
  const refreshTokenHash = hashToken(refreshToken);
  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false
  });

  if (!session) {
    throw new AppError("Session not found or session has been revoked", 404);
  }

  const decoded = jwt.verify(refreshToken, config.jwtSecret);
  const newAccessToken = createAccessToken(decoded.id);
  const newRefreshToken = createRefreshToken(decoded.id);

  session.refreshTokenHash = hashToken(newRefreshToken);
  await session.save();

  return {
    success: true,
    token: newAccessToken,
    newRefreshToken
  };
};

export const logoutFromAll = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, config.jwtSecret);

  await sessionModel.updateMany(
    {
      userId: decoded.id,
      revoked: false
    },
    {
      revoked: true
    }
  );
};

export const logoutFromCurrentDevice = async (refreshToken) => {
  const refreshTokenHash = hashToken(refreshToken);
  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false
  });

  if (!session) {
    throw new AppError("Session not found", 404);
  }

  session.revoked = true;
  await session.save();
};
