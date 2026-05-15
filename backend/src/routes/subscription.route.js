import express from "express";
import { CreateSubscription } from "../controller/subscription.controller.js";

const subRoute=express.Router();

subRoute.post("/create-Subscription",CreateSubscription);

export default subRoute;