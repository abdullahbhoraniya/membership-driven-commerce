import { createProduct, getAllProducts } from "../services/product.service.js";

export const getProducts = async (req, res) => {

    try {

        const userData = {

            userId: req.user._id,

            name: req.user.userName,

            email: req.user.email,

            subscription: req.user.subscription,
        };

        const result =
            await getAllProducts(userData);

        return res.status(200).json({

            success: result.success,

            subscriptionPlan:
                result.subscriptionPlan,

            products:
                result.products
        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message:
                "Error fetching products"
        });
    }
};

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