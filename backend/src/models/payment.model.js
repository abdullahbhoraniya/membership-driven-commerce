import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    subscription:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subscription"
    },

    razorpayOrderId:String,

    razorpayPaymentId:String,

    amount:Number,

    paymentStatus:{
        type:String,
        enum:["pending","success","failed"],
        default:"pending"
    }

},
{
    timestamps:true
});

export const Payment = mongoose.model("Payment",paymentSchema);