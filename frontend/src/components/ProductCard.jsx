const ProductCard = ({
    product,
    isPremiumUser
}) => {

    return (

        <div
            className="bg-white rounded-[28px] overflow-hidden border border-gray-200 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >

            <div className="relative">

                <img
                    src={product.image}
                    alt={product.productName}
                    className={`w-full h-72 object-cover ${
                        product.premiumOnly &&
                        !isPremiumUser
                            ? "blur-[2px]"
                            : ""
                    }`}
                />

                {product.premiumOnly && (

                    <div className="absolute top-4 left-4 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                        PREMIUM
                    </div>
                )}
            </div>

            <div className="p-6">

                <div className="mb-4">

                    <h2 className="text-2xl font-bold mb-2">
                        {product.productName}
                    </h2>

                    <div className="flex items-center gap-3">

                        <span className="text-3xl font-black">
                            ₹{product.finalPrice}
                        </span>

                        <span className="text-gray-400 line-through">
                            ₹{product.originalPrice}
                        </span>
                    </div>

                    <p className="text-green-600 font-semibold mt-2">
                        Save {product.discountPercent}%
                    </p>
                </div>

                {product.premiumOnly &&
                !isPremiumUser ? (

                    <div>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Unlock elite premium products,
                            exclusive discounts, and member-only
                            experiences designed for serious shoppers.
                        </p>

                        <a
                            href="/subscription"
                            className="w-full inline-block text-center bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
                        >
                            Unlock Premium Access
                        </a>
                    </div>

                ) : (

                    <button
                        className={`w-full py-3 rounded-2xl font-semibold text-white transition ${
                            product.premiumOnly
                                ? "bg-indigo-600 hover:bg-indigo-700"
                                : "bg-black hover:bg-gray-800"
                        }`}
                    >
                        Buy Now
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;