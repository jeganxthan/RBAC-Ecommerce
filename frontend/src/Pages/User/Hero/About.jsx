import React from 'react';
import { Truck, Ticket, Headphones } from 'lucide-react';
import iphone from '../../../assets/user/iphone.png';
import sofa from '../../../assets/user/sofa.png';
import cloths from '../../../assets/user/cloths.png';
import books from '../../../assets/user/books.png';
import beauty from '../../../assets/user/beauty.png';
import appliances from '../../../assets/user/appliances.png';
import headphone from '../../../assets/user/headphone.png';
import { Navigate, useNavigate } from 'react-router-dom';
const About = () => {
    const navigate = useNavigate();
    return (
        <div className='space-y-[20px]' id='about'>
            <div className="flex w-full md:h-[300px] md:gap-10 gap-4 flex-col md:flex-row h-[700px]">
                <div className="bg-[#FFD700] md:w-1/4 rounded-3xl md:ml-10 overflow-hidden relative">
                    <p className="absolute top-20 left-6 right-6 text-xl text-white text-center w-[100px] font-bold md:block hidden">
                        SOFAS
                    </p>

                    <h1 className="absolute inset-0 flex items-center justify-center text-gray-600 font-extrabold text-4xl z-0 Michroma">
                        FURNITURES
                    </h1>

                    <img
                        src={sofa}
                        alt="sofa"
                        className="ml-auto max-w-none w-[150%] z-10 relative opacity-80"
                    />
                </div>
                <div className="bg-[#00FA9A] md:w-1/4 rounded-3xl overflow-hidden relative">
                    <p className="absolute bottom-[240px] left-6 right-6 text-xl text-white text-center w-[200px] font-bold">
                        GET LATEST BOOKS
                    </p>

                    <h1 className="absolute inset-0 flex items-center justify-center text-gray-600 font-extrabold text-4xl z-0 Michroma bottom-[100px]">
                        BOOKS
                    </h1>

                    <img
                        src={books}
                        alt="books"
                        className="ml-auto max-w-none w-[100%] z-10 relative  mt-[100px]"
                    />
                </div>
                <div className="bg-[#ED1C24] md:w-2/4 rounded-3xl overflow-hidden relative md:mr-10">
                    <p className="absolute bottom-[240px] left-6 right-6 text-xl text-white text-center w-[200px] font-bold">
                        GET LATEST MODEL
                    </p>

                    <h1 className="absolute inset-0 flex items-center justify-center text-slate-600 font-extrabold text-4xl z-0 Michroma bottom-[100px] md:left-[300px]">
                        ELECTRONICS
                    </h1>

                    <img
                        src={iphone}
                        alt="books"
                        className="ml-auto max-w-none w-[100%] z-10 relative opacity-80"
                    />
                </div>
            </div>
            <div className="flex w-full md:h-[280px] gap-10 md:flex-row flex-col h-[700px]">
                <div className="bg-[#C0C0C0] md:w-2/4 rounded-3xl overflow-hidden relative md:ml-10">
                    <p className="absolute bottom-[240px] left-[10px] text-xl text-white text-center w-[300px] font-bold">
                        FOR MENS WOMAN KIDS
                    </p>

                    <h1 className="absolute inset-0 flex items-center justify-center text-slate-600 font-extrabold text-4xl z-0 Michroma bottom-[100px] md:left-[400px]">
                        CLOTHS
                    </h1>

                    <img
                        src={cloths}
                        alt="books"
                        className="ml-auto max-w-none w-[100%] z-10 relative opacity-80"
                    />
                </div>
                <div className="bg-[#FF69B4] md:w-1/4 rounded-3xl overflow-hidden relative">
                    <p className="absolute top-2 left-6 right-6 text-xl text-white text-center w-[100px] font-bold md:block hidden">
                        BRANDED BEAUTY PRODUCTS
                    </p>

                    <h1 className="absolute inset-0 flex items-center justify-center text-gray-400 font-extrabold text-4xl z-0 Michroma">
                        BEAUTY
                    </h1>

                    <img
                        src={beauty}
                        alt="sofa"
                        className="ml-auto max-w-none w-[70%] z-10 relative opacity-80"
                    />
                </div>
                <div className="bg-[#1E90FF] md:w-1/4 rounded-3xl overflow-hidden relative md:mr-10">
                    <p className="absolute top-2 left-1 right-6 text-xl text-white text-center w-[300px] font-bold md:block hidden">
                        ALL HOME APPLIANCES
                    </p>

                    <h1 className="absolute inset-0 flex items-center justify-center text-gray-800 font-extrabold text-4xl z-0 Michroma">
                        APPLIANCES
                    </h1>

                    <img
                        src={appliances}
                        alt="sofa"
                        className="ml-auto max-w-none w-[150%] z-10 relative opacity-80"
                    />
                </div>

            </div>
            <div className='flex flex-col md:flex-row justify-between p-6 md:px-[100px]'>
                <div className='flex items-center space-x-4'>
                    <Truck size={45} className='text-[#ED1C24]' />
                    <div className='flex flex-col mb-4 md:mb-0'>
                        <p className='text-xl text-black font-bold'>Free Shiping</p>
                        <p className='text-sm text-gray-600 '>Free Shiping on order over 500</p>
                    </div>
                </div><div className='flex items-center space-x-4'>
                    <Ticket size={45} className='text-[#ED1C24]' />
                    <div className='flex flex-col mb-4 md:mb-0'>
                        <p className='text-xl text-black font-bold'>Money Guarantee</p>
                        <p className='text-sm text-gray-600 '>100% Money back</p>
                    </div>
                </div><div className='flex items-center space-x-4'>
                    <Headphones size={45} className='text-[#ED1C24]' />
                    <div className='flex flex-col mb-4 md:mb-0'>
                        <p className='text-xl text-black font-bold'>Online Support 24/7</p>
                        <p className='text-sm text-gray-600 '>Technical support</p>
                    </div>
                </div>
            </div>
            <div className="relative w-full md:mr-10">
                <div className="bg-[#ED1C24] w-full rounded-[50px] overflow-hidden h-[280px] md:h-[340px] md:mt-[100px] border-[20px] border-white relative z-0">
                    <div className="absolute top-10 left-10 z-0 flex md:flex-row justify-between gap-[300px]">
                        <div className='flex flex-col'>
                            <p className="text-white text-3xl md:text-8xl font-bold">SUMMER</p>
                            <span className="text-white text-3xl md:text-7xl font-extrabold">SALE</span>
                            <p className='text-white'>11/10</p>
                            <p className='bg-white p-2 w-[90px] rounded-full mt-2 hover:bg-gray-400 md:hidden'
                                onClick={() => navigate(`/search`)}
                            >Shop now</p>
                        </div>
                        <div>
                            <p className="text-white text-8xl font-bold">SALE</p>
                            <span className="text-gray-300 text-base ">This summer, upgrade your lifestyle with our Summer Sale on electronics and more! From premium headphones and smartwatches to home gadgets and accessories — everything is available at unbeatable discounts. Limited time only don’t miss out!</span>
                            <p className='bg-white p-2 w-[90px] rounded-full mt-2 hover:bg-gray-400'>Shop now</p>
                        </div>
                    </div>
                </div>
                <img
                    src={headphone}
                    alt="headphone"
                    className="absolute left-[200px] transform -translate-x-1/2 -top-20 w-[40%] z-10 md:block hidden"
                />
            </div>


        </div>
    );
};

export default About;
