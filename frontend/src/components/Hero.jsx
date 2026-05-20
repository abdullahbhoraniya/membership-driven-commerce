import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Hero = () => {

    const { user } = useAuth();

    // CHECK PREMIUM STATUS
    const isPremiumUser = Boolean(
        user &&
        user.subscription &&
        user.subscriptionEndDate &&
        new Date(user.subscriptionEndDate) > new Date()
    );

    return (

        <div className="max-w-7xl mx-auto px-6 pt-12 pb-10">

            <div className="relative overflow-hidden rounded-[36px] bg-black text-white p-10 lg:p-16">

                {/* BACKGROUND EFFECT */}

                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>

                <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-purple-500/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

                    {/* LEFT CONTENT */}

                    <div>

                        {/* PREMIUM USER */}

                        {isPremiumUser ? (

                            <>
                                <p className="uppercase tracking-[4px] text-sm text-green-400 mb-4 font-semibold">
                                    Premium Membership Active
                                </p>

                                <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
                                    Welcome Back,
                                    Premium Member 🚀
                                </h1>

                                <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                                    You now have access to exclusive
                                    premium products, member-only pricing,
                                    fast delivery benefits, and early access
                                    deals.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">

                                    <Link
                                        to="/"
                                        className="bg-white text-black px-7 py-4 rounded-2xl font-semibold hover:scale-105 transition-all"
                                    >
                                        Explore Products
                                    </Link>

                                    <button className="border border-gray-700 px-7 py-4 rounded-2xl hover:bg-white hover:text-black transition-all">
                                        View Benefits
                                    </button>
                                </div>
                            </>
                        ) : (

                            <>
                                {/* FREE USER */}

                                <p className="uppercase tracking-[4px] text-sm text-yellow-400 mb-4 font-semibold">
                                    Premium Commerce Platform
                                </p>

                                <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
                                    Unlock Exclusive Deals &
                                    Premium Shopping
                                </h1>

                                <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                                    Buy premium products, unlock member-only
                                    discounts, and access fast delivery perks
                                    with our subscription commerce platform.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">

                                    <Link
                                        to="/subscription"
                                        className="bg-white text-black px-7 py-4 rounded-2xl font-semibold hover:scale-105 transition-all"
                                    >
                                        Explore Membership
                                    </Link>

                                    <button className="border border-gray-700 px-7 py-4 rounded-2xl hover:bg-white hover:text-black transition-all">
                                        Learn More
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* RIGHT SIDE STATS / CARD */}

                    <div className="flex justify-center lg:justify-end">

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-md">

                            <h2 className="text-2xl font-bold mb-6">
                                {isPremiumUser
                                    ? "Membership Benefits"
                                    : "Why Go Premium?"}
                            </h2>

                            <div className="space-y-5">

                                <div className="flex items-center justify-between">

                                    <span className="text-gray-300">
                                        Premium Products
                                    </span>

                                    <span className="text-green-400 font-bold">
                                        ✓
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">

                                    <span className="text-gray-300">
                                        Fast Delivery
                                    </span>

                                    <span className="text-green-400 font-bold">
                                        ✓
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">

                                    <span className="text-gray-300">
                                        Member Discounts
                                    </span>

                                    <span className="text-green-400 font-bold">
                                        ✓
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">

                                    <span className="text-gray-300">
                                        Early Access Deals
                                    </span>

                                    <span className="text-green-400 font-bold">
                                        ✓
                                    </span>
                                </div>
                            </div>

                            {/* STATUS */}

                            <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10">

                                <p className="text-sm text-gray-400 mb-2">
                                    Current Status
                                </p>

                                <h3
                                    className={`text-xl font-bold ${
                                        isPremiumUser
                                            ? "text-green-400"
                                            : "text-yellow-400"
                                    }`}
                                >
                                    {isPremiumUser
                                        ? "Premium Active"
                                        : "Free Account"}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;