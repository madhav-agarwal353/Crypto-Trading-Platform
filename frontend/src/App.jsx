import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Button } from './components/ui/button'
import Navbar from '@/components/Navbar.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-background text-foreground h-screen">
      <Navbar></Navbar>
    </div>
  )
}

export default App
