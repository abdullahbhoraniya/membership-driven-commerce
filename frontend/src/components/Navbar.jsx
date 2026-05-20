import { useAuth } from "../hook/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
      navigate("/login");
    }
  };

  if (!user) return null;

  const displayName = user.userName || user.email;

  const isPremium = Boolean(
    user.subscription &&
      user.subscriptionEndDate &&
      new Date(user.subscriptionEndDate) > new Date()
  );

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          🛍️ Commerce
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end text-right gap-0">
            <span className="text-sm font-medium">{displayName}</span>
            <span className="text-xs text-gray-300">{user.email}</span>

            {isPremium && (
              <div className="mt-1 flex items-center gap-2">
                <span className="bg-yellow-300 text-black text-xs px-2 py-1 rounded-full font-semibold">
                  Premium
                </span>
                {user.subscriptionEndDate && (
                  <span className="text-xs text-gray-300">
                    Expires {new Date(user.subscriptionEndDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 md:px-4 py-2 rounded-lg transition text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
