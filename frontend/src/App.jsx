import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subscription from "./pages/Subscription";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {

    return (

        <BrowserRouter>
            <Navbar />
            <Routes>

                <Route
                    path="/login"
                    element={
                        <ProtectedRoute requireAuth={false}>
                            <Login />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <ProtectedRoute requireAuth={false}>
                            <Register />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/subscription"
                    element={
                        <ProtectedRoute>
                            <Subscription />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App