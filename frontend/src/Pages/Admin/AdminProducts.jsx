import React, { useContext, useEffect, useState } from 'react'
import SideMenu from '../../components/sidebar/SideMenu'
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS, BASE_URL } from '../../utils/apipaths';

const AdminProducts = () => {
    const location = useLocation();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const fetchProducts = async () => {
        try {
            const res = await axiosInstance.get(API_PATHS.ADMIN.GET_ALL_PRODUCT);
            setProducts(res.data.products);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Failed to Fetch products, err");
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };
    return (
        <div>
            <SideMenu activeMenu={location.pathname} />
            <div className='md:ml-[100px] md:mt-10 ml-12 mt-6'>
                <h2 className='text-xl font-semibold mb-4'>All Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
                    {products.map((product) => (
                        <div key={product.id} className="card p-4 bg-white shadow-md rounded-md" onClick={()=>navigate(`/admin/product/${product._id}`)}>
                            <img src={`${BASE_URL}${product.images?.[0]}`}
                                alt={product.name} className="h-40 object-cover rounded-md mb-4 "/>
                            <p><strong>Name:</strong> {product.name}</p>
                            <p><strong>Price:</strong> ${product.price}</p>
                            <p class="line-clamp-2"><strong>Description:</strong> {product.description}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        className="bg-gray-200 p-2 rounded-md mr-2"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <span className="p-2">{`Page ${page} of ${totalPages}`}</span>
                    <button
                        className="bg-gray-200 p-2 rounded-md ml-2"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminProducts