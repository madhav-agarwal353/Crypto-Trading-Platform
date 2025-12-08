import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Button } from './components/ui/button'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-background text-foreground h-screen">
      <span class="text-3xl font-bold underline">
        Hello world!
      </span>
      <Button>hello</Button>
    </div>
  )
}

export default App
