import { Payment } from "../models/payment.model.js";
import userModel from "../models/user.model.js";
import { CreateOrder, VerifyPayment } from "../services/payment.service.js";
import AppError from "../utils/AppError.js";

export const createOrder=async(req,res)=>{
    const {subscriptionId}=req.body;

    const createOrderResponse=await CreateOrder(subscriptionId);

    
    if(createOrderResponse.success){
        const order = createOrderResponse.order;
        res.status(200).json({
            success:true,
            message:"Order Created successfully",
            order: order,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        })
    }
    else{
        throw new AppError("Error while creating order",500)
    }

    const order=await createOrderResponse.order;

    await Payment.create({
        user:req.user._id,
        subscription:subscriptionId,
        razorpayOrderId:order.id,
        amount:order.amount / 100,
        paymentStatus:"pending"
    })
}

export const verifyPayment=async(req,res)=>{
    console.log("VERIFY PAYMENT CALLED", req.body);
    const {orderId,paymentId,signature}=req.body;

    console.log("Received payment details", { orderId, paymentId, signature });

    if(!orderId || !paymentId || !signature){
        return res.status(400).json({
            success:false,
            message:"Missing required payment details"
        })
    }

    const paymentDetails={
        paymentId:paymentId,
        orderId:orderId,
        signature:signature
    };

    const result=await VerifyPayment(paymentDetails);

    if(result){
        return res.status(200).json({
            success:true,
            message:"Payment verified successfully",
        })
    }
    else{
        throw new AppError("Invalid payment details",500);
    }
    const payment=await Payment.findOne({
        razorpayOrderId:orderId
    });

    if(!payment){
        throw new AppError("there is no such record please try again");
    }

    payment.paymentStatus="success",
    payment.razorpayPaymentId=paymentId;
    await payment.save();

    const user=await userModel.findById({_id:payment.user});

    user.subscription=payment.subscription;

    user.subscriptionStartDate=new Date();

    user.subscriptionEndDate=new Date(
        Date.now() + 30*24*60*60*1000
    );
    await user.save();

    return res.status(200).json({
        success:true,
        message:"Subscription activated successfully"
    })
}
