import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../../../utils/axiosInstance';
import { API_PATHS, BASE_URL } from '../../../../utils/apipaths';
import { MoveLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { ShoppingCart } from 'lucide-react';
import BuyModal from './BuyModal'
const GetProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [addCart, setAddCart] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const handleAddToCart = async () => {
        try {
            const response = await axiosInstance.post(API_PATHS.USERS.ADD_CART, {
                productId,
                quantity
            })
            if (response.status == 200) {
                toast.success('Product added successfully');
                setAddCart(response.data);
            } else {
                toast.error('Error in adding a product');
            }
        } catch (error) {
            console.error('Error Fetching Add to cart');
        }
    }
    const fetchDetails = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_PRODUCT(productId));
            let productData = response.data;
            if (productData.specs && typeof productData.specs === 'String') {
                try {
                    productData.specs = JSON.parse(productData.specs);
                } catch (error) {
                    productData.specs = [];
                }
            }
            setProduct(productData);
        } catch (error) {
            console.error('Error fetching product details', error);
        }
    }
    useEffect(() => {
        fetchDetails();
    }, [productId]);
    const handleNextImage = () => {
        if (!product?.images) return;
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };
    const handlePreviousImage = () => {
        if (!product?.images) return;
        setCurrentImageIndex((prev) => (prev - 1) % product.images.length) % product.images.length;
    }
    const handleBuy = (price) => {
        setSelectedAmount(price * 100);
        setShowBuyModal(true);
    }
    if (!product) return <p className="text-center mt-10 text-gray-500">Loading product...</p>;

    return (
        <div>
            <div className="max-w-5xl mx-auto p-2 py-10">
                <div className='flex flex-row justify-between'>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-blue-600 hover:underline mb-6"
                    >
                        <MoveLeft className="mr-2" /> Back
                    </button>
                    <button className='text-blue-600 hover:text-blue-900' onClick={() => navigate('/user/cart')}>
                        <ShoppingCart />
                    </button>
                </div>
                <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
                {product.images && product.images.length > 0 && (
                    <div className="mb-6 relative">
                        <div className='flex items-center justify-center'>

                            <img
                                src={`${BASE_URL}${product.images[currentImageIndex]}`}
                                alt={`Product image ${currentImageIndex + 1}`}
                                className="w-full h-[500px] rounded-md object-contain transition duration-300"
                            />
                        </div>
                        {product.images.length > 1 && (

                            <div className="flex gap-4">
                                <button
                                    onClick={handlePreviousImage}
                                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition duration-200"
                                >
                                    ⬅ Previous
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition duration-200"
                                >
                                    Next ➡
                                </button>
                            </div>
                        )}
                    </div>
                )}
                <div className="mb-6">
                    <p className="p-2 bg-red-500 text-white text-lg">Price:</p>
                    <p className="text-gray-700 mb-2">{product.price || 'No price available.'}</p>
                    <div>
                        <p className="p-2 bg-blue-500 text-white text-lg">Description:</p>
                        <p className="text-gray-700">{product.description || 'No description available.'}</p> <p className="p-2 bg-slate-500 text-white text-lg">Stock:</p>
                        <p className="text-gray-700">{product.stock || 'No stock available.'}</p>
                    </div>
                    <p className="p-2 bg-orange-500 text-white text-lg">Specifications:</p>
                    {product.specs && Array.isArray(product.specs) && product.specs.length > 0 ? (
                        <ul className="text-black text-lg mt-2">
                            {product.specs.map(({ key, value }, index) => (
                                <li key={index}>
                                    <span className="font-medium">{key}:</span> {value}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No specifications available.</p>
                    )}
                </div>
                <div className='flex flex-row justify-between gap-[70px] text-base'>
                    <button className='rounded-md p-2 bg-yellow-400 w-full hover:bg-yellow-700' onClick={() => handleBuy(product.price)}>Buy Now</button>
                    <button className='hover:bg-yellow-700 rounded-md bg-yellow-400 w-full p-2' onClick={handleAddToCart}>Add To Cart</button>

                </div>
            </div>
            {product.seller && (
                <div className="mt-8 p-4 border-t flex items-center gap-4">
                    <div>
                        <p>Product By</p>
                        <p className="font-medium text-lg">{product.seller.name}</p>
                        <p className="text-sm text-gray-500">{product.seller.email}</p>
                    </div>
                </div>
            )}
            {showBuyModal && (
                <BuyModal
                    amount={selectedAmount}
                    onClose={() => setShowBuyModal(false)}
                />
            )}
        </div>
    )
}

export default GetProduct