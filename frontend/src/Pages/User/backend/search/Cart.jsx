import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../utils/axiosInstance';
import { API_PATHS, BASE_URL } from '../../../../utils/apipaths';
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BuyModal from './BuyModal';

const Cart = () => {
  const [showCart, setShowCart] = useState([]);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_CART);
      setShowCart(response.data);
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const deleteCart = async (productId) => {
    try {
      const response = await axiosInstance.delete(API_PATHS.USERS.REMOVE_CART(productId));
      if (response.status === 200) {
        toast.success("Product removed successfully");
        setShowCart(prev => prev.filter(p => p.product._id !== productId));
      } else {
        toast.error("Error removing product");
      }
    } catch (error) {
      console.error("Error removing product", error);
    }
  };

  const handleBuy = (price) => {
    setSelectedAmount(price * 100); // convert to cents
    setShowBuyModal(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-2 py-10">
      <div className='flex flex-row justify-between'>
        <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:underline mb-6">
          <MoveLeft className="mr-2" /> Back
        </button>
        <h2 className="text-2xl">YOUR CART</h2>
        <p>In Cart: {showCart.length}</p>
      </div>

      <ul>
        {showCart.map((item) => (
          <li key={item.product._id}>
            <div className="flex md:flex-row bg-white p-6 rounded-lg shadow-lg items-center gap-6 flex-col">
              <img
                src={`${BASE_URL}${item.product.images?.[0]}`}
                alt={item.product.name}
                className="w-[200px] h-[200px]"
              />
              <div className="md:w-[500px] w-[200px]">
                <p className="text-3xl font-bold">{item.product.name}</p>
                <p className="text-base font-bold">${item.product.price}</p>
                <div className="flex flex-row gap-2">
                  <p>Stock:</p><p>{item.product.stock}</p>
                </div>
                <p className="line-clamp-2">{item.product.description}</p>
                <div className="flex flex-row gap-4 mt-2">
                  <button
                    className="rounded-md p-2 bg-yellow-400 hover:bg-yellow-700"
                    onClick={() => handleBuy(item.product.price)}
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => deleteCart(item.product._id)}
                    className="rounded-md p-2 bg-red-600 hover:bg-red-900 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {showBuyModal && (
        <BuyModal
          amount={selectedAmount}
          onClose={() => setShowBuyModal(false)}
        />
      )}
    </div>
  );
};

export default Cart;
