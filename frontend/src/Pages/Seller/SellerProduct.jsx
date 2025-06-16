import React, { useEffect, useState } from 'react'
import SideMenu from '../../components/sidebar/SideMenu'
import { useLocation } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apipaths';
import { toast } from 'react-toastify';

const SellerProduct = () => {
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
    const location = useLocation();
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
    });
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const [specs, setSpecs] = useState([{ key: "", value: "" }]);

    const handleValueChange = (key, value) => {
        setProductData((prevData) => ({ ...prevData, [key]: value }));
    }
    const addSpec = () => {
        setSpecs((prev) => [...prev, { key: "", value: "" }]);
    }
    const removeSpec = (index) => {
        setSpecs((prev) => prev.filter((_, i) => i !== index));
    }
    const handleSpecChange = (index, field, value) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = value;
        setSpecs(newSpecs);
    }
    const handleFileChange = (e) => {
        setImages(Array.from(e.target.files));
    }

    const clearData = () => {
        setProductData({
            name: '',
            price: '',
            description: '',
            category: '',
            stock: '',
        });
        setImages([]);
        setSpecs([{ key: '', value: '' }]);
    };

    const createProduct = async () => {
        try {
            const formData = new FormData();

            Object.entries(productData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            images.forEach((image, index) => {
                formData.append(`images`, image);
            });

            formData.append("specs", JSON.stringify(specs)); 

            const response = await axiosInstance.post(
                API_PATHS.SELLER.CREATE_PRODUCT,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );


            if (response.data.success) {
                toast.success("Product created successfully!");
                clearData();
                setImages([]);
                setSpecs([{ key: "", value: "" }]);
            } else {
                toast.error("Failed to create product.");
            }
        } catch (error) {
            console.error("Error creating Product:", error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!productData.name.trim()) {
            setError("name is required");
        } if (!productData.price) {
            setError("price is required");
        } if (!productData.description.trim()) {
            setError("description is required");
        } if (!productData.category.trim()) {
            setError("category is required");
        } if (!productData.stock) {
            setError("stock is required");
        }
        await createProduct();
    };
    return (
        <div>
            <SideMenu activeMenu={location.pathname} />
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className='md:ml-[100px] md:mt-10 ml-12 mt-6 mr-6'>
                    <h1 className='text-lg font-semibold'>
                        Create Product
                    </h1>
                    <div className='flex flex-col gap-4'>

                        <div className="flex flex-row items-center gap-2 justify-between w-full">
                            <div className="flex flex-col w-full">
                                <label className="form-label">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Product name"
                                    className="form-input"
                                    value={productData.name}
                                    onChange={({ target }) => handleValueChange("name", target.value)}
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="form-label">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    className="form-input"
                                    value={productData.price}
                                    onChange={({ target }) => handleValueChange("price", target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className='form-label'>Description</label>
                            <textarea placeholder='Describe Task' className='form-input' rows={4} value={productData.description} onChange={({ target }) =>
                                handleValueChange("description", target.value)
                            } />
                        </div>
                        <div className='flex flex-row gap-6'>
                            <div className='flex flex-col'>
                                <label className="form-label">Category</label>
                                <select
                                    name="category"
                                    value={productData.category}
                                    onChange={({ target }) => handleValueChange("category", target.value)}
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
                            </div>

                            <div className='flex flex-col'>
                                <label>Images</label>
                                <input type="file" multiple className='p-4 w-[300px]' onChange={handleFileChange} />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="form-label">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    className="form-input"
                                    value={productData.stock}
                                    onChange={({ target }) => handleValueChange("stock", target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <label className="form-label mb-2">Specifications</label>
                            {specs.map((spec, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Key"
                                        value={spec.key}
                                        onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                                        className="form-input w-1/2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={spec.value}
                                        onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                                        className="form-input w-1/2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSpec(index)}
                                        className="text-red-500 text-xl hover:text-red-700 transition"
                                        title="Remove"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSpec}
                                className="mt-2 text-blue-600 font-medium hover:underline self-start"
                            >
                                + Add Specification
                            </button>
                        </div>
                    </div>
                    {error && (
                        <p className='text-xs font-medium text-red-500 mt-5'>{error}</p>
                    )}
                    <div>
                        <button type='submit' className='flex justify-center bg-blue-300 text-blue-700 w-full p-2 text-lg mt-4 hover:bg-blue-100' onClick={handleSubmit}>
                            CREATE PRODUCT
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default SellerProduct