import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const ProtectedRoute = ({children, requireAuth = true})=>{

    const { user, loading } = useAuth();

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg">Loading...</p>
            </div>
        )
    }

    // If requireAuth is false (for login/register), redirect authenticated users to home
    if (!requireAuth && user) {
        return <Navigate to="/" />;
    }

    // If requireAuth is true (for protected pages), redirect unauthenticated users to login
    if(requireAuth && !user){
        return <Navigate to="/login" />
    }

    return children;
}

export default ProtectedRoute;