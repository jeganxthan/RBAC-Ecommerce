import React from 'react'
import { Twitter, Facebook, Instagram, Linkedin, Github } from 'lucide-react'
const Footer = () => {
  return (
    <footer id='contact' className="bg-gray-900 text-gray-300 py-10">
  <div className="container mx-auto px-6 md:px-12">
    <div className="flex flex-col md:flex-row justify-between gap-8">
      
      <div className="md:w-1/3">
        <h3 className="text-white text-xl font-bold mb-4">YourCompany</h3>
        <p className="text-sm">
          Providing quality electronics and accessories at unbeatable prices. Shop with confidence and enjoy excellent support.
        </p>
      </div>

      <div className="md:w-1/3 flex justify-between">
        <div>
          <h4 className="text-white font-semibold mb-3">Shop</h4>
          <ul>
            <li className="mb-2 hover:text-white cursor-pointer">New Arrivals</li>
            <li className="mb-2 hover:text-white cursor-pointer">Best Sellers</li>
            <li className="mb-2 hover:text-white cursor-pointer">Discounts</li>
            <li className="mb-2 hover:text-white cursor-pointer">Accessories</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul>
            <li className="mb-2 hover:text-white cursor-pointer">Contact Us</li>
            <li className="mb-2 hover:text-white cursor-pointer">FAQs</li>
            <li className="mb-2 hover:text-white cursor-pointer">Shipping</li>
            <li className="mb-2 hover:text-white cursor-pointer">Returns</li>
          </ul>
        </div>
      </div>

      <div className="md:w-1/3">
        <h4 className="text-white font-semibold mb-4">Follow Us</h4>
        <div className="flex space-x-6 text-xl">
          <a href="#" className="hover:text-white" aria-label="Facebook"><Twitter/></a>
          <a href="#" className="hover:text-white" aria-label="Twitter"><Facebook/></a>
          <a href="#" className="hover:text-white" aria-label="Instagram"><Instagram/></a>
          <a href="#" className="hover:text-white" aria-label="LinkedIn"><Linkedin/></a>
          <a href="#" className="hover:text-white" aria-label="Github"><Github/></a>
        </div>
      </div>
    </div>

    <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Jeganathan. All rights reserved.
    </div>
  </div>
</footer>

  )
}

export default Footer