import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import iphone from '../../../assets/user/iphone.png';
import sofa from '../../../assets/user/sofa.png';
import cloths from '../../../assets/user/cloths.png';
import books from '../../../assets/user/books.png';
import beauty from '../../../assets/user/beauty.png';
import appliances from '../../../assets/user/appliances.png';
import football from '../../../assets/user/football.png';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    img: iphone,
    title: 'ELECTRONICS',
  },
  {
    img: sofa,
    title: 'FURNITURES',
  }, {
    img: cloths,
    title: 'CLOTHS',
  }, {
    img: books,
    title: 'BOOKS',
  }, {
    img: beauty,
    title: 'BEAUTY PRODUCTS',
  }, {
    img: appliances,
    title: 'HOME APPLIANCES',
  }, {
    img: football,
    title: 'SPORTS',
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const imgRef = useRef(null);
  const buttonRef = useRef(null);

  const [index, setIndex] = useState(0);

  const animateContent = () => {
    const tl = gsap.timeline();

    tl.to(headingRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: 'power2.out',
    }, 0);

    tl.to(imgRef.current, {
      x: 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, 0);

    tl.add(() => {
      setIndex(prev => (prev + 1) % items.length);
    });

    tl.fromTo(headingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.in' }
    );

    tl.fromTo(imgRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.in' },
      '<0.1'
    );
  };

  useEffect(() => {
    // Initial animation
    gsap.fromTo(headingRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo(imgRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.3 });
    gsap.fromTo(buttonRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.6 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      animateContent();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { img, title } = items[index];

  return (
    <div id='home' className='bg-[#E5E4E2] h-screen border-[20px] border-white border-t-[85px] rounded-b-[70px] relative flex justify-center items-center overflow-hidden'>
      <div className="absolute select-none pointer-events-none Michroma flex flex-col text-center items-center">
        <h1 ref={headingRef} className='font-extrabold text-white text-[40px] md:text-[120px] tracking-wider'>
          {title}
        </h1>
      </div>

      <div className="absolute bottom-[15%] z-20">
        <button
          ref={buttonRef}
          className="px-6 py-3 bg-[#ED1C24] text-white font-semibold rounded-full w-max hover:bg-red-700 transition"
          onClick={()=>navigate(`/search`)}
        >
          View Products
        </button>
      </div>

      <img
        ref={imgRef}
        src={img}
        alt={title}
        className="relative z-10 max-w-xs w-full h-auto transition-all duration-700 ease-in-out"
      />


    </div>
  );
};

export default Hero;
