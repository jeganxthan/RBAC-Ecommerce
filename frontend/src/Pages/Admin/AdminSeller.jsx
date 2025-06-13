import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';
import SideMenu from '../../components/sidebar/SideMenu';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apipaths';
import defaultProfile from '../../assets/defaultProfile.jpg';

const AdminSeller = () => {
    const location = useLocation();
    const { user } = useContext(UserContext);
    const [sellers, setSellers] = useState([]);

    const fetchSellers = async () => {
        try {
            const res = await axiosInstance.get(API_PATHS.ADMIN.GET_ALL_SELLER);
            setSellers(res.data);
        } catch (err) {
            console.error("Failed to fetch sellers", err);
        }
    };

    useEffect(() => {
        fetchSellers();
    }, []);

    if (sellers.length === 0) return null;

    return (
        <div>
            <SideMenu activeMenu={location.pathname} />
            <div className='md:ml-[100px] md:mt-10 ml-12 mt-6'>
                <h2 className='text-xl font-semibold mb-4'>Manage Sellers</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sellers.map((seller) => (
                        <li key={seller.id} className="p-4 bg-white shadow-md rounded-md grid grid-cols-2 gap-2 items-center">
                            <div className="flex justify-center">
                                <img
                                    src={seller.profilePicture || defaultProfile}
                                    alt="User Profile"
                                    className="rounded-full w-[100px] h-[100px]"
                                />
                            </div>

                            <div>
                                <p><strong>Name:</strong> {seller.name}</p>
                                <p><strong>Email:</strong> {seller.email}</p>
                                <button className='bg-red-600 p-2 rounded-md text-white hover:bg-red-300 mt-2'>Block</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminSeller;