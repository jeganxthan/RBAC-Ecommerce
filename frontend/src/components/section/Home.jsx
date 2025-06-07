import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import illustration from '../../assets/illustration.svg'
import logo from '../../assets/logoremove.png'

const Home = () => {
  const [currentPage, setCurrentPage] = useState('login')

  // refs to panels
  const leftPanelRef = useRef(null)
  const rightPanelRef = useRef(null)

useEffect(() => {
  const screenWidth = window.innerWidth;

  // Run animation only if screen is md or larger (>= 768px)
  if (screenWidth >= 768) {
    if (currentPage === 'signup') {
      gsap.to(leftPanelRef.current, { x: 950, duration: 0.5, ease: 'power2.out' });
      gsap.to(rightPanelRef.current, { x: -550, duration: 0.5, ease: 'power2.out' });
    } else {
      gsap.to(leftPanelRef.current, { x: 0, duration: 0.5, ease: 'power2.out' });
      gsap.to(rightPanelRef.current, { x: 0, duration: 0.5, ease: 'power2.out' });
    }
  }
}, [currentPage]);


  return (
    <div className="flex h-screen md:overflow-hidden">
      {/* Left Panel */}
      <div
        ref={leftPanelRef}
        className="md:w-1/2 relative rounded-tr-[250px] rounded-br-[50px] overflow-hidden w-full"
      >
        <img
          src={illustration}
          alt="illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Panel */}
      <div
        ref={rightPanelRef}
        className="w-1/2 bg-white flex flex-col items-center justify-center relative"
      >

        <div className="flex flex-col items-center justify-center h-full w-full px-8">
          {currentPage === 'login' ? (
            <Login setCurrentPage={setCurrentPage} />
          ) : (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
