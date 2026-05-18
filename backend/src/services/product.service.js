import { Product } from "../models/product.js";
import { Subscription } from "../models/subscription.model.js";
import userModel from "../models/user.model.js";

export const getAllProducts = async (user) => {

    try {

        // GET USER SUBSCRIPTION
        let subscription = user.subscription;

        // IF NO SUBSCRIPTION
        // FETCH FREE PLAN
        if (!subscription) {

            subscription =
            await Subscription.findOne({
                name: "Free"
            });
        }

        // FETCH PRODUCTS
        const products = await Product.find();

        // APPLY DYNAMIC DISCOUNT
        const updatedProducts =
        products.map((product) => {

            const originalPrice =
            product.price;

            const discountPercent =
            subscription.discountPercent;

            console.log("DiscountPercent",discountPercent);

            const discountAmount =
            (
                originalPrice *
                discountPercent
            ) / 100;

            const finalPrice =
            originalPrice - discountAmount;

            return {

                productId: product._id,

                productName: product.productName,

                image: product.image,

                originalPrice,

                discountPercent,

                discountAmount,

                finalPrice,

                premiumOnly:
                product.premiumOnly,

                isPremiumLocked:
                product.premiumOnly &&
                subscription.name === "Free"
            };
        });
        console.log("Updated product data",updatedProducts)
        return {

            success: true,

            subscriptionPlan:
            subscription.name,

            products: updatedProducts
        };

    }
    catch (error) {

        console.log(
            "Error fetching products",
            error
        );

        return {

            success: false,

            message:
            "Error fetching products"
        };
    }
};

export const createProduct = async (productDetails) => {

    try {

        const {
            productName,
            image,
            price,
            premiumOnly
        } = productDetails;

        const product = await Product.create({

            productName,

            image,

            price,

            premiumOnly
        });
        console.log("Product data",product)
        return {

            success: true,

            message: "Product created successfully",

            productData: product
        };

    }
    catch (error) {

        console.log(
            "Error creating product",
            error
        );

        throw new AppError(
            "Error while creating product",
            500
        );
    }
};