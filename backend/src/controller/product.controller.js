import { createProduct, getAllProducts } from "../services/product.service.js";

export const getProducts=async(req,res)=>{
    console.log("Req user Id",req.user._id)
    const userID=req.user._id;
    console.log("userId",userID)
    console.log("Comes in to the /get-product router and the data is",req.body);
    
    const userData={
        userId:req.user._id,
        name:req.user.userName,
        email:req.user.email,
        subscription:req.user.subscription,
    }
    console.log("userData",userData.userId);

    const getProductsForUsers=await getAllProducts(userData);


    
}


export const CreateProduct =
async (req,res,next)=>{

    try{

        const {
            productName,
            image,
            price,
            premiumOnly
        } = req.body;

        // VALIDATION
        if(
            !productName ||
            !image ||
            price === undefined ||
            premiumOnly === undefined
        ){
            throw new AppError(
                "Something is missing",
                400
            );
        }

        const productDetails = {
            productName,
            image,
            price,
            premiumOnly
        };

        const result =
        await createProduct(productDetails);

        return res.status(201).json({
            success:true,
            message:result.message,
            product:result.productData
        });

    }
    catch(error){

        next(error);
    }
};