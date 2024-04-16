import React, {useEffect} from 'react'
import { BrowserRouter } from 'react-router-dom'
import AnimatedRoutes from './routes'

function App() {
    // useEffect(() => {
    //     document.body.classList.add('dark');
    // }, []);

  return (
    <BrowserRouter>
      <AnimatedRoutes/>
    </BrowserRouter>
  )
}

export default App
