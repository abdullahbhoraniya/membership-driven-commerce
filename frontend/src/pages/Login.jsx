import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
const Login = ()=>{

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    const loginHandler = async(e)=>{

        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        setLoading(true);
        try{
            const result = await login(email, password);
            if(result.success){
                navigate("/");
            } else {
                setError(result.message || "Login failed");
            }
        }
        catch(error){
            console.log(error);
            setError("Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Membership Commerce
                </h1>

                <form
                    onSubmit={loginHandler}
                    className="space-y-5"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
                    />

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-black font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login;