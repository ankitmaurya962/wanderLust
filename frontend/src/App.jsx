import React from 'react'
import Index from './pages/Index'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Index></Index>
      <Footer></Footer>
    </div>
  )
}

export default App