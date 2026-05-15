import { razorpayinstance } from "../config/razorpay.config.js";

import crypto from 'crypto';
import { config } from "../utils/config.js";
import { Subscription } from "../models/subscription.model.js";

export const CreateOrder = async (subscriptionId) => {

    try {

        const subscriptionDetails = await Subscription.findById(subscriptionId);

        if (!subscriptionDetails) {
            return {
                success: false,
                message: "Subscription not found"
            };
        }

        const razorpayIns = razorpayinstance;

        const option = {

            amount: subscriptionDetails.price * 100,

            currency: "INR",

            receipt: `receipt_${Date.now()}`
        };

        const order = await new Promise((resolve, reject) => {

            razorpayIns.orders.create(option, (err, order) => {

                if (err) {
                    reject(err);
                }
                else {
                    resolve(order);
                }
            });
        });

        return {
            success: true,
            order
        };

    }
    catch (error) {

        console.log("Error creating order", error);

        return {
            success: false,
            message: "Error creating order"
        };
    }
};
export const VerifyPayment = async ({
    paymentId,
    orderId,
    signature
}) => {

    const generatedSignature = crypto
        .createHmac(
            "sha256",
            config.razorpay_key_secret
        )
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

    return generatedSignature === signature;
};