import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import SignUp from "./pages/Auth/SignUp";
import { ToastContainer, toast } from "react-toastify";
import Hello from "./pages/Hello";
import AdminPanel from "./pages/Admin/AdminPanel";
import { useAuth } from "./context/authcontext";
import UpdateProduct from "./components/UpdateProduct";
import Cart from "./components/Cart";

const AdminRoute = () => {
  const [auth] = useAuth();

  if (!auth.user || auth.user.role !== "admin") {
    toast.error("Unauthorized");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected Admin Route */}
        <Route path="/admin-panel" element={<AdminRoute />}>
          <Route index element={<AdminPanel />} />
        </Route>
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
