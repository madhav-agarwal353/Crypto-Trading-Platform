import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-screen bg-black'>
          <Button>hello world</Button>
      </div>
    </>
  )
}

export default App
