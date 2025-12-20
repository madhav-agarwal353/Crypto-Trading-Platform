import { useState } from 'react'
import viteLogo from '/vite.svg'
import './index.css'
import { Button } from './components/ui/button'
import Navbar from '@/components/pages/Navbar.jsx'
import Home from '@/components/pages/Home'
import Portfolio from './components/pages/Portfolio'
import { Route, Routes } from 'react-router-dom'
import Activity from './components/pages/Activity'
import Wallet from './components/pages/Wallet'
import Withdrawal from './components/pages/Withdrawal'
import PaymentDetails from './components/pages/PaymentDetails'
import StockDetails from './components/pages/StockDetails'
import WatchList from './components/pages/WatchList'
import Profile from './components/pages/Profile'
import Search from './components/pages/SearchCoin'
import NotFound from './components/pages/NotFound'
import Login from './components/lib/Login'
import Signup from './components/lib/Signup'
import ForgotPassword from './components/lib/ForgotPassword'
function App() {
  // Replace this with your actual auth logic (e.g., from a context or Redux)
  const isAuthenticated = false;

  return (
    <div className="bg-background text-foreground min-h-screen">
      {isAuthenticated && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/withdrawal" element={<Wallet />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/market/:id" element={<StockDetails />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
          </>
        ) : (
          <Route path="*" element={<Login />} />
        )}
        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
