import express from "express";
import { CreateSubscription, getSubscription } from "../controller/subscription.controller.js";

const subRoute=express.Router();

subRoute.post("/create-Subscription",CreateSubscription);
subRoute.get('/get-subscription',getSubscription);

export default subRoute;