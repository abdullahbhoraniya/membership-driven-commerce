import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
     durationInDays:{
        type:Number,
        required:true
    },
    discountPercent: {
        type: Number,
        default: 0
    },

    fastDelivery: {
        type: Boolean,
        default: false
    },

    premiumDeals: {
        type: Boolean,
        default: false
    },
},
{
    timestamps:true
});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);