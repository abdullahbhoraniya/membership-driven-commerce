import { Product } from "../models/product.js";
import { Subscription } from "../models/subscription.model.js";
import userModel from "../models/user.model.js";

export const getAllProducts = async (user) => {

    try {

        let subscription = null;

        // FETCH USER SUBSCRIPTION
        if (user.subscription) {

            subscription =
                await Subscription.findById(
                    user.subscription
                );
        }

        // FALLBACK FREE PLAN
        if (!subscription) {

            subscription =
                await Subscription.findOne({
                    name: "Free"
                });
        }

        console.log(
            "SUBSCRIPTION DATA",
            subscription
        );

        const products =
            await Product.find();

        const updatedProducts =
            products.map((product) => {

                const originalPrice =
                    product.price;

                const discountPercent =
                    subscription.discountPercent || 0;

                const discountAmount =
                    (
                        originalPrice *
                        discountPercent
                    ) / 100;

                const finalPrice =
                    originalPrice -
                    discountAmount;

                return {

                    productId: product._id,

                    productName:
                        product.productName,

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

        return {

            success: true,

            subscriptionPlan:
                subscription.name,

            products:
                updatedProducts
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
        console.log("Product data", product)
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