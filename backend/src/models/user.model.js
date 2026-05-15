import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    subscription:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subscription",
        default:null
    },
    subscriptionStartDate:{
        type:Date
    },
    subscriptionEndDate:{
        type:Date
    }
},{
    timestamps:true
});


const userModel=mongoose.model("User",userSchema);

export default userModel;