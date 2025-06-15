import React from 'react';

const UserModal = ({ isOpen, onClose, seller }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Seller Profile</h2>
                    <button onClick={onClose} className="text-xl font-bold">X</button>
                </div>
                <div className="mt-4">
                    <img
                        src={seller.profileImageUrl || '/path/to/defaultProfile.jpg'}
                        alt="Seller Profile"
                        className="rounded-full w-[100px] h-[100px] mx-auto"
                    />
                    <p className="mt-4"><strong>Name:</strong> {seller.name}</p>
                    <p><strong>Email:</strong> {seller.email}</p>
                    <p><strong>Role:</strong> {seller.role}</p>
                    <button
                        onClick={() => alert('Block functionality')}
                        className="bg-red-600 p-2 rounded-md text-white hover:bg-red-300 mt-4 w-full"
                    >
                        Block
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
