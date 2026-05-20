import { Payment } from "../models/payment.model.js";
import userModel from "../models/user.model.js";
import { CreateOrder, VerifyPayment } from "../services/payment.service.js";
import AppError from "../utils/AppError.js";

export const createOrder=async(req,res)=>{
    const {subscriptionId}=req.body;
    console.log("Requested user id ",req.user._id)
    console.log("comes in with id:",subscriptionId)

    const createOrderResponse=await CreateOrder(subscriptionId);

     if (!createOrderResponse.success) {

        throw new AppError(
            "Error while creating order",
            500
        );
    }
    
    const order = createOrderResponse.order;
    console.log("Order after creation",order)

    const response=await Payment.create({
        user:req.user._id,
        subscription:subscriptionId,
        razorpayOrderId:order.id,
        amount:order.amount / 100,
        paymentStatus:"pending"
    })
    console.log("Response",response)
       return res.status(200).json({
            success:true,
            message:"Order Created successfully",
            order: order,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        })
    }

export const verifyPayment = async (req, res) => {

    try {

        console.log(
            "VERIFY PAYMENT CALLED",
            req.body
        );

        const {
            orderId,
            paymentId,
            signature
        } = req.body;

        console.log(
            "Received payment details",
            {
                orderId,
                paymentId,
                signature
            }
        );

        // =========================
        // VALIDATION
        // =========================

        if (
            !orderId ||
            !paymentId ||
            !signature
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Missing required payment details"
            });
        }

        // =========================
        // VERIFY PAYMENT
        // =========================

        const paymentDetails = {

            paymentId,

            orderId,

            signature
        };

        const result =
            await VerifyPayment(
                paymentDetails
            );

        if (!result) {

            throw new AppError(
                "Invalid payment details",
                500
            );
        }

        // =========================
        // FIND PAYMENT RECORD
        // =========================

        const payment =
            await Payment.findOne({

                razorpayOrderId: orderId
            });

        console.log(
            "PAYMENT RECORD",
            payment
        );

        if (!payment) {

            throw new AppError(
                "No payment record found",
                404
            );
        }

        // =========================
        // UPDATE PAYMENT
        // =========================

        payment.paymentStatus =
            "success";

        payment.razorpayPaymentId =
            paymentId;

        await payment.save();

        // =========================
        // FIND USER
        // =========================

        const user =
            await userModel.findById(
                payment.user
            );

        console.log(
            "USER",
            user
        );

        if (!user) {

            throw new AppError(
                "User not found",
                404
            );
        }

        // =========================
        // UPDATE USER SUBSCRIPTION
        // =========================

        user.subscription =
            payment.subscription;

        user.subscriptionStartDate =
            new Date();

        user.subscriptionEndDate =
            new Date(
                Date.now() +
                30 *
                24 *
                60 *
                60 *
                1000
            );

        await user.save();

        // =========================
        // FINAL RESPONSE
        // =========================

        return res.status(200).json({

            success: true,

            message:
                "Subscription activated successfully"
        });

    }
    catch (error) {

        console.log(
            "VERIFY PAYMENT ERROR",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Internal Server Error"
        });
    }
};

// Payment history for current user
export const getPaymentHistory = async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user._id })
            .populate('subscription')
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, payments });
    } catch (error) {
        console.error('getPaymentHistory error', error);
        return res.status(500).json({ success: false, message: 'Unable to fetch payment history' });
    }
};