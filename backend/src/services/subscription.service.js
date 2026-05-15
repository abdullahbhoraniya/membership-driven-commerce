import { Subscription } from "../models/subscription.model.js";
import AppError from "../utils/AppError.js";

export const createSubscriptions = async (subDetails) => {

    try {
        console.log("coMES IN TO THE SERVICE");
        const {
            name,
            price,
            durationInDays,
            discountPercent,
            fastDelivery,
            premiumDeals
        } = subDetails;

        const subscription = await Subscription.create({

            name:name,

            price:price,

            durationInDays:durationInDays,

            discountPercent:discountPercent,

            fastDelivery:fastDelivery,

            premiumDeals:premiumDeals
        });

        return {

            success:true,

            message:"Subscription created successfully",

            subscriptionData:subscription
        };

    }
    catch(error){

        console.log("Error creating subscription",error);
        throw new AppError("Error while creating the subscription",500);
    }
};