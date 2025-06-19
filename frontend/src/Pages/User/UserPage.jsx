import React from 'react'
import Navbar from './Hero/Navbar/Navbar'
import Hero from './Hero/Hero'
import About from './Hero/About'
import Footer from './Hero/Footer'

const UserPage = () => {
  return (
    <div>
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>
       <div>
        <Hero />
        <About />
        <Footer />
      </div>
    </div>
  )
}

export default UserPage