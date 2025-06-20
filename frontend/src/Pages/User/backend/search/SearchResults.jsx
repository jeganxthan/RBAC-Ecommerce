import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../utils/axiosInstance';
import { API_PATHS, BASE_URL } from '../../../../utils/apipaths';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const searchTerm = query.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USER_PRODUCT, {
          params: { search: searchTerm, page: 1, limit: 20 },
        });
        setProducts(response.data.products);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  if (!searchTerm) return <div>Please enter a search term.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-3xl p-14">
      <h2 className="text-xl mb-4">Search results for "{searchTerm}"</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <li key={product._id} className="border rounded p-4 shadow">
                <img src={`${BASE_URL}${product.images?.[0]}`} alt="image" onClick={()=>navigate(`/product/${product._id}`)}/>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
              <p className="mt-2 font-bold">${product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
