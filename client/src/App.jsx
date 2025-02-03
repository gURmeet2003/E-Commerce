import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const AdminRoute = ({ element }) => {
  const [auth] = useAuth();
  if (!auth.user || auth.user.role !== "admin") {
    toast.error("Unauthorized");
    return <Navigate to="/" />;
  }
  return element;
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

        {/* Protected Admin Route */}
        <Route
          path="/admin-panel"
          element={<AdminRoute element={<AdminPanel />} />}
        />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
