import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import { API_PATHS, BASE_URL } from '../../../utils/apipaths';
import { MoveLeft } from 'lucide-react';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [seller, setSeller] = useState(null);
  const fetchDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.ADMIN.GET_PRODUCT(productId));
      let productData = response.data;

      if (productData.specs && typeof productData.specs === 'string') {
        try {
          productData.specs = JSON.parse(productData.specs);
        } catch {
          productData.specs = [];
        }
      }
      if (productData.seller && typeof productData.seller === 'object') {
        setSeller(productData.seller); 
      } else if (productData.seller && typeof productData.seller === 'string') {
        const sellerRes = await axiosInstance.get(`/admin/seller/${productData.seller}`);
        setSeller(sellerRes.data);
      }

      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product details', error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [productId]);

  const handleNextImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePreviousImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  if (!product) return <p className="text-center mt-10 text-gray-500">Loading product...</p>;

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-lg ">
      <button onClick={() => navigate(`/admin/seller-products`)} className="mb-4 ">
        <MoveLeft />
      </button>

      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-[-40px]">{product.name}</h2>
      <div className='flex flex-row gap-4'>
        {product.images && product.images.length > 0 && (
          <div className="flex flex-col items-center mb-6">
            <img
              src={`${BASE_URL}${product.images[currentImageIndex]}`}
              alt={`product image ${currentImageIndex + 1}`}
              className="w-[1000px] h-[500px] object-cover rounded-md shadow-md mb-4 transition duration-300 ease-in-out"
            />

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

            <p className="text-sm mt-2 text-gray-500">
              Image {currentImageIndex + 1} of {product.images.length}
            </p>
          </div>
        )}
        <div className="space-y-4">
          <p className='text-white text-xl bg-blue-500 p-2'>Description</p>
          <p className='text-black text-lg mt-2'>{product.description}</p>
          <p className='text-white text-xl bg-violet-500 p-2'>Price</p>
          <p className='text-black text-lg mt-2'>{product.price}</p>
          <div className='flex flex-row'>
            <p className='text-white text-xl bg-cyan-500 p-2 mr-2 rounded-lg'>Category</p>
            <p className='text-black text-lg mt-2'>{product.category}</p>
          </div>
          <p className='text-white text-xl bg-red-500 p-2'>stock</p>
          <p className='text-black text-lg mt-2'>{product.stock}</p>

          <div>
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
        </div>

      </div>
        {seller && (
         <div className="mt-10 p-6 border rounded-lg bg-gray-50 shadow-md">
  <p className="text-2xl font-bold text-blue-700 mb-4">Seller Information</p>
  <div className="flex items-center gap-6">
    <img
      src={seller.profileImageUrl}
      alt="Seller profile"
      className="rounded-full w-28 h-28 object-cover border-2 border-blue-500 shadow-sm"
    />
    <div className="space-y-2">
      <div>
        <span className="block text-sm font-semibold text-gray-600">Name</span>
        <p className="text-lg text-gray-900">{seller.name}</p>
      </div>
      <div>
        <span className="block text-sm font-semibold text-gray-600">Email</span>
        <p className="text-lg text-gray-900">{seller.email}</p>
      </div>
    </div>
  </div>
</div>

        )}
    </div>
  );
};

export default ProductDetails;
