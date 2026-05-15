import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    premiumOnly:{
        type:Boolean,
        default:false
    }
});

export const Product = mongoose.model("Product",productSchema);