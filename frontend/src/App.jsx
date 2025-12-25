import { useEffect } from 'react';
import './index.css';
import Navbar from '@/components/pages/Navbar.jsx';
import Home from '@/components/pages/Home';
import Portfolio from './components/pages/Portfolio';
import Activity from './components/pages/Activity';
import Wallet from './components/pages/Wallet';
import PaymentDetails from './components/pages/PaymentDetails';
import StockDetails from './components/pages/StockDetails';
import WatchList from './components/pages/WatchList';
import Profile from './components/pages/Profile';
import Search from './components/pages/SearchCoin';
import NotFound from './components/pages/NotFound';
import Login from './components/lib/Login';
import Signup from './components/lib/Signup';
import ForgotPassword from './components/lib/ForgotPassword';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from './components/store/Auth/Action';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const ProtectedRoute = ({ auth, children }) => {
    if (!auth?.jwt || !auth?.user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  useEffect(() => {
    if (!auth.jwt) return;
    dispatch(getUserData({ jwt: auth.jwt }));
  }, [auth.jwt, dispatch]);

  const location = useLocation();

  useEffect(() => {
    if (auth.jwt && auth.user) {
      // Only navigate if user is on public pages
      if (['/login', '/signup', '/forgot-password'].includes(location.pathname)) {
        navigate('/');
      }
    }
  }, [auth.jwt, auth.user, location.pathname, navigate]);
  return (
    <div className="bg-background text-foreground overflow-y-scroll scroll-smooth scrollbar-dark">
      {/* Show Navbar only if logged in */}
      {auth.jwt && auth.user && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute auth={auth}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute auth={auth}>
              <Portfolio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activity"
          element={
            <ProtectedRoute auth={auth}>
              <Activity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute auth={auth}>
              <Wallet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute auth={auth}>
              <Wallet/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-details"
          element={
            <ProtectedRoute auth={auth}>
              <PaymentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/market/:id"
          element={
            <ProtectedRoute auth={auth}>
              <StockDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute auth={auth}>
              <WatchList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute auth={auth}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute auth={auth}>
              <Search />
            </ProtectedRoute>
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
