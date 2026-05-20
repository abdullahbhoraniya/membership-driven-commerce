import { Subscription } from "../models/subscription.model.js";
import { createSubscriptions } from "../services/subscription.service.js";
import AppError from "../utils/AppError.js";

export const CreateSubscription=async(req,res,next)=>{
    try{
        console.log("COmes in with data",req.body);
    const {name,price,durationInDays,discountPercent,fastDelivery,premiumDeals}=req.body;
    if(
    !name ||
    price === undefined ||
    durationInDays === undefined ||
    discountPercent === undefined ||
    fastDelivery === undefined ||
    premiumDeals === undefined
){
    throw new AppError("Something is missing",404);
}
    const subDetails = {

    name,

    price,

    durationInDays,

    discountPercent,

    fastDelivery,

    premiumDeals
};
    const createSubscription=await createSubscriptions(subDetails);

    if(createSubscription.success){
        return res.status(200).json({
            succcess:true,
            message:"Subscription created successfully",
            data:createSubscription.subscriptionData
        })
    }
    else{
        throw new AppError("Error whil creating subscriptoon")
    }
}
catch(err){
    next(err)
}
}

export const getSubscription=async(req,res,next)=>{
    try {
        const getSubscription=await Subscription.find();

        console.log("Subscription data",getSubscription.data);
        return res.status(200).json({
            success:true,
            message:"Subscription fetch successfully",
            data:getSubscription
        })
    } catch (error) {
        
    }
}