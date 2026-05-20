import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../hook/useAuth";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [tab, setTab] = useState('products');
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const { user } = useAuth();

    const isPremiumUser = Boolean(
        user && user.subscription && user.subscriptionEndDate && new Date(user.subscriptionEndDate) > new Date()
    );

    const fetchProducts = async () => {

        try {

            const response = await API.get(
                "/products/get-products"
            );
            console.log("Response from the backend", response);
            setProducts(response.data.products || []);
        }
        catch (error) {

            console.log(error);
        }
    }

    const fetchHistory = async () => {
        try {
            setLoadingHistory(true);
            const response = await API.get('/payments/history');
            setHistory(response.data.payments || []);
        }
        catch (err) {
            console.log(err);
            setHistory([]);
        }
        finally { setLoadingHistory(false); }
    }

    useEffect(() => {

        const init = async () => {
            await fetchProducts();
        }

        init();
    }, []);

    useEffect(() => {
        if (tab === 'history') {
            const load = async () => {
                await fetchHistory();
            }
            load();
        }
    }, [tab]);

    return (

        <div className="min-h-screen bg-[#f5f7fb]">

            {/* NAVBAR */}

            <div className="bg-white border-b sticky top-0 z-50">

                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-black tracking-tight">
                            Membership Commerce
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => setTab("products")}
                            className={`px-5 py-2 rounded-xl font-medium transition-all ${tab === "products"
                                ? "bg-black text-white"
                                : "bg-gray-100 text-black"
                                }`}
                        >
                            Products
                        </button>

                        <button
                            onClick={() => setTab("history")}
                            className={`px-5 py-2 rounded-xl font-medium transition-all ${tab === "history"
                                ? "bg-black text-white"
                                : "bg-gray-100 text-black"
                                }`}
                        >
                            Purchase History
                        </button>
                    </div>
                </div>
            </div>

            {/* HERO SECTION */}
            <Hero />
            {/* PRODUCT SECTION */}

            <div className="max-w-7xl mx-auto px-6 pb-16">

                {tab === "products" && (

                    <>

                        {/* HEADER */}

                        <div className="flex items-center justify-between mb-10">

                            <div>

                                <h2 className="text-4xl font-black">
                                    Featured Products
                                </h2>

                                <p className="text-gray-500 mt-3 text-lg">
                                    Curated products personalized for your membership
                                </p>
                            </div>

                            {isPremiumUser && (

                                <div className="bg-green-100 text-green-700 px-5 py-3 rounded-full text-sm font-bold">
                                    Premium Membership Active
                                </div>
                            )}
                        </div>

                        {/* NORMAL PRODUCTS */}

                        <div className="mb-20">

                            <div className="mb-8">

                                <h3 className="text-3xl font-bold mb-2">
                                    Available Products
                                </h3>

                                <p className="text-gray-500">
                                    Products available for all users
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                                {products
                                    .filter(
                                        (product) =>
                                            !product.premiumOnly
                                    )
                                    .map((product) => (

                                        <ProductCard
                                            key={
                                                product.productId
                                            }
                                            product={product}
                                            isPremiumUser={
                                                isPremiumUser
                                            }
                                        />
                                    ))}
                            </div>
                        </div>

                        {/* PREMIUM PRODUCTS */}

                        <div>

                            <div className="mb-8">

                                <div className="flex items-center gap-4 mb-3">

                                    <h3 className="text-3xl font-black">
                                        Premium Collection
                                    </h3>

                                    <span className="bg-yellow-400 text-black text-xs px-4 py-2 rounded-full font-bold">
                                        EXCLUSIVE
                                    </span>
                                </div>

                                <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">

                                    Unlock premium-only products carefully curated
                                    for members who want exclusive access, bigger
                                    discounts, and priority shopping experiences.

                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                                {products
                                    .filter(
                                        (product) =>
                                            product.premiumOnly
                                    )
                                    .map((product) => (

                                        <ProductCard
                                            key={
                                                product.productId
                                            }
                                            product={product}
                                            isPremiumUser={
                                                isPremiumUser
                                            }
                                        />
                                    ))}
                            </div>
                        </div>
                    </>
                )}

                {tab === "history" && (

                    <div>

                        <div className="mb-8">

                            <h2 className="text-3xl font-bold">
                                Purchase History
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Your recent subscription activity
                            </p>
                        </div>

                        {loadingHistory ? (

                            <div className="text-lg">
                                Loading history...
                            </div>

                        ) : (

                            <div className="space-y-5">

                                {history.length === 0 && (

                                    <div className="bg-white p-8 rounded-3xl text-center text-gray-500 border">
                                        No purchase history found.
                                    </div>
                                )}

                                {history.map((h) => (

                                    <div
                                        key={h._id}
                                        className="bg-white p-6 rounded-3xl border border-gray-200 flex justify-between items-center hover:shadow-lg transition"
                                    >

                                        <div>

                                            <h3 className="text-xl font-bold">
                                                {h.subscription?.name || "Subscription"}
                                            </h3>

                                            <p className="text-gray-500 mt-1">
                                                Amount: ₹{h.amount}
                                            </p>

                                            <p className="text-sm text-green-600 font-medium mt-2">
                                                {h.paymentStatus}
                                            </p>
                                        </div>

                                        <div className="text-sm text-gray-400">
                                            {new Date(h.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}


export default Home;