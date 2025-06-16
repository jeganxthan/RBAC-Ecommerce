import React from 'react';

const EditProductModal = ({ product, onChange, onClose, onSave }) => {
    if (!product) return null;
    const categories = [
        'Electronics',
        'Furniture',
        'Clothing',
        'Books',
        'Beauty',
        'Home Appliances',
        'Toys',
        'Sports',
        'Other'
    ]
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Product</h2>

                <label className="block mb-2">
                    Name:
                    <input
                        type="text"
                        value={product.name}
                        onChange={(e) => onChange('name', e.target.value)}
                        className="border p-2 w-full"
                    />
                </label>
                <label className="block mb-2">
                    price:
                    <input
                        type="number"
                        value={product.price}
                        onChange={(e) => onChange('price', e.target.value)}
                        className="border p-2 w-full"
                    />
                </label><label className="block mb-2">
                    description:
                    <textarea
                        type="number"
                        value={product.description}
                        onChange={(e) => onChange('description', e.target.value)}
                        className="border p-2 w-full"
                    />
                </label>
                <label className="block mb-2">
                    stock:
                    <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => onChange('stock', e.target.value)}
                        className="border p-2 w-full"
                    />
                </label>

                <label className="block mb-4">
                    Category:
                    <select
                        name="category"
                        value={product.category}
                        onChange={(e) => onChange('category', e.target.value)}
                        className="p-4 w-[300px] bg-white border rounded"
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        {categories.map((cat) => (
                            <option value={cat} key={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </label>


                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;
