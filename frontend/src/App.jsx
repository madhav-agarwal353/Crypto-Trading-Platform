import { useState } from 'react'
import viteLogo from '/vite.svg'
import './index.css'
import { Button } from './components/ui/button'
import Navbar from '@/components/Navbar.jsx'
import Home from '@/components/Home'
function App() {

  return (
    <div className="bg-background text-foreground h-screen" >
      <Navbar />
      <Home />
    </div>
  )
}

export default App
