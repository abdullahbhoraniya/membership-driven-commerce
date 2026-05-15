import express from "express";
import { getMe, loginUser, logout, logoutAll, refreshtoken, registerUser } from "../controller/auth.controller.js";

const authroute = express.Router();

authroute.post("/register", registerUser);
authroute.post('/login', loginUser);
authroute.get("/getme", getMe);
authroute.get("/refreshtoken", refreshtoken);
authroute.get('/logout', logout);
authroute.get('/logout-all', logoutAll);

export default authroute;