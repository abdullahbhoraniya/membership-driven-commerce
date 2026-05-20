import { useEffect, useState } from "react";

import API from "../api/axios";

const Subscription = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buyingPlanId, setBuyingPlanId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isRazorpayReady, setIsRazorpayReady] = useState(() => {
        if (typeof window === "undefined") return false;
        return Boolean(
            document.querySelector(
                'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
            )
        );
    });

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setLoading(true);
                setErrorMessage(null);

                const response = await API.get(
                    "/subscription/get-subscription"
                );

                const subscriptions =
                    Array.isArray(response?.data?.data)
                        ? response.data.data
                        : Array.isArray(response?.data?.subscriptions)
                            ? response.data.subscriptions
                            : [];

                setPlans(subscriptions);
            } catch (error) {
                console.error("Subscription Fetch Error", error);
                setErrorMessage("Unable to load subscription plans.");
                setPlans([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    useEffect(() => {
        if (isRazorpayReady) return;

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        script.onload = () => setIsRazorpayReady(true);
        script.onerror = () =>
            setErrorMessage(
                "Unable to load Razorpay SDK. Please refresh the page."
            );

        document.body.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [isRazorpayReady]);

    const buySubscription = async (subscriptionId) => {
        setErrorMessage(null);
        setSuccessMessage(null);
        setBuyingPlanId(subscriptionId);

        try {
            console.log("Request set with this id", subscriptionId)
            const response = await API.post(
                "/payments/create-payment",
                { subscriptionId }
            );

            const order = response?.data?.order;

            if (!order) {
                throw new Error("Order creation failed");
            }

            if (!window.Razorpay || !isRazorpayReady) {
                throw new Error(
                    "Payment SDK not ready. Please refresh the page."
                );
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                name: "Membership Commerce",
                description: "Subscription Purchase",
                handler: async (paymentResponse) => {
                    try {
                        const verifyResponse = await API.post(
                            "/payments/verify-payment",
                            {
                                orderId:
                                    paymentResponse.razorpay_order_id,
                                paymentId:
                                    paymentResponse.razorpay_payment_id,
                                signature:
                                    paymentResponse.razorpay_signature,
                            }
                        );

                        if (verifyResponse?.data?.success) {
                            setSuccessMessage(
                                "Subscription activated successfully."
                            );
                        } else {
                            setErrorMessage(
                                verifyResponse?.data?.message ||
                                "Payment verification failed."
                            );
                        }
                    } catch (verifyError) {
                        console.error("Payment Verification Error", verifyError);
                        setErrorMessage("Payment verification failed.");
                    }
                },
                theme: {
                    color: "#000000",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Buy Subscription Error", error);
            setErrorMessage(
                error?.message || "Unable to process subscription purchase."
            );
        } finally {
            setBuyingPlanId(null);
        }
    };

    const subscriptionPlans = Array.isArray(plans) ? plans : [];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Membership Plans
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Pick the subscription that suits your needs.
                    </p>
                </div>

                {loading && (
                    <div className="text-center text-lg font-medium">
                        Loading plans...
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-6 text-center text-red-600">
                        {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-6 text-center text-green-600">
                        {successMessage}
                    </div>
                )}

                {!loading && subscriptionPlans.length === 0 && (
                    <div className="text-center text-gray-500">
                        No subscription plans found.
                    </div>
                )}

                {!loading && subscriptionPlans.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {subscriptionPlans
                            .filter(
                                (plan) =>
                                    plan?.name?.toLowerCase() !== "free"
                            )
                            .map((plan) => (

                                <div
                                    key={plan?._id}
                                    className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300"
                                >

                                    <div className="flex items-center justify-between mb-4">

                                        <h2 className="text-2xl font-bold capitalize">
                                            {plan?.name}
                                        </h2>

                                        <span className="text-sm bg-black text-white px-3 py-1 rounded-full">
                                            {plan?.durationInDays || "0"} Days
                                        </span>
                                    </div>

                                    <div className="mb-4">

                                        <p className="text-4xl font-bold text-black">
                                            ₹{plan?.price || 0}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Discount:
                                            {" "}
                                            {plan?.discountPercent || 0}%
                                        </p>
                                    </div>

                                    <div className="space-y-3 mb-6">

                                        <div className="flex items-center justify-between">

                                            <span className="text-gray-700">
                                                Fast Delivery
                                            </span>

                                            <span>
                                                {plan?.fastDelivery
                                                    ? "✅"
                                                    : "❌"}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">

                                            <span className="text-gray-700">
                                                Premium Deals
                                            </span>

                                            <span>
                                                {plan?.premiumDeals
                                                    ? "✅"
                                                    : "❌"}
                                            </span>
                                        </div>
                                    </div>

                                    {plan?.price > 0 && (

                                        <button
                                            onClick={() =>
                                                buySubscription(plan?._id)
                                            }
                                            disabled={
                                                buyingPlanId === plan?._id
                                            }
                                            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
                                        >

                                            {buyingPlanId === plan?._id
                                                ? "Processing..."
                                                : "Buy Plan"}
                                        </button>
                                    )}
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Subscription;
