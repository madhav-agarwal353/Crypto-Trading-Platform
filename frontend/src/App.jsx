import { useEffect } from "react";
import "./index.css";

import { Routes, Route, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/components/pages/Navbar.jsx";
import Home from "@/components/pages/Home";
import Portfolio from "@/components/pages/Portfolio";
import Activity from "@/components/pages/Activity";
import Wallet from "@/components/pages/Wallet";
import PaymentDetails from "@/components/pages/PaymentDetails";
import StockDetails from "@/components/pages/StockDetails";
import WatchList from "@/components/pages/WatchList";
import Profile from "@/components/pages/Profile";
import Search from "@/components/pages/SearchCoin";
import NotFound from "@/components/pages/NotFound";

import Login from "@/components/lib/Login";
import Signup from "@/components/lib/Signup";
import ForgotPassword from "@/components/lib/ForgotPassword";

import { getUserData } from "@/components/store/Auth/Action";

/* =========================
   Protected Route Wrapper
========================= */
const ProtectedRoute = ({ auth }) => {
  if (!auth.jwt) {
    return <Navigate to="/login" replace />;
  }

  // JWT exists but user not loaded yet
  if (auth.jwt && !auth.user) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return <Outlet />;
};

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useSelector((state) => state.auth);

  /* =========================
     Fetch User on App Load
  ========================= */
  useEffect(() => {
    if (auth.jwt && !auth.user) {
      dispatch(getUserData({ jwt: auth.jwt }));
    }
  }, [auth.jwt, auth.user, dispatch]);

  /* =========================
     Prevent Logged-in User
     From Visiting Auth Pages
  ========================= */
  useEffect(() => {
    if (
      auth.jwt &&
      auth.user &&
      ["/login", "/signup", "/forgot-password"].includes(location.pathname)
    ) {
      navigate("/", { replace: true });
    }
  }, [auth.jwt, auth.user, location.pathname, navigate]);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-y-scroll scrollbar-dark">
      {/* Show Navbar only when authenticated */}
      {auth.jwt && auth.user && <Navbar />}

      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ===== PROTECTED ROUTES ===== */}
        <Route element={<ProtectedRoute auth={auth} />}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/payment-details" element={<PaymentDetails />} />
          <Route path="/market/:id" element={<StockDetails />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Route>

        {/* ===== 404 ===== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
