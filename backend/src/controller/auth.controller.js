import {
  currentData,
  login,
  logoutFromAll,
  logoutFromCurrentDevice,
  refresTokenCreation,
  register
} from "../services/auth.service.js";
import AppError from "../utils/AppError.js";

export const registerUser = async (req, res, next) => {
  try {
    console.log("Register api called and the data is :",req.body);
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      throw new AppError("Something is missing, please provide all required fields", 400);
    }

    const userResponse = await register(userName, email, password);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      userDetails: {
        userName: userResponse.user.userName,
        email: userResponse.user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

export const refreshtoken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("Refresh token not found", 401);
    }

    const response = await refresTokenCreation(refreshToken);

    res.cookie("refreshToken", response.newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: "New access token unlocked",
      token: response.token
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    console.log("comes in ",req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError("Unauthorized", 401);
    }

    const response = await currentData(token);

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user: response.user
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const response = await login(
      email,
      password,
      req.ip,
      req.headers["user-agent"] || "unknown"
    );

    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        userName: response.userData.userName,
        email: response.userData.email,
        subscription:response.userData.subscription
      },
      token: response.accessToken
    });
  } catch (error) {
    next(error);
  }
};

export const logoutAll = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError("Refresh token not found", 401);
    }

    await logoutFromAll(refreshToken);
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged out from all devices successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError("Refresh token not found", 401);
    }

    await logoutFromCurrentDevice(refreshToken);
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    next(error);
  }
};
